const Exam = require("../../models/ExamModule/ExamModule");

const addExam = async(req,res)=>{
    try{
        const newExam = new Exam(req.body);
        await newExam.save();
        res.status(201).json({message:"Exam added successfully",exam:newExam});

    }catch(error){
        res.status(500).json({message:"Error adding exam ",error});
    }
}

const deleteExam = async (req,res)=>{
    try{
        const {id} = req.params;
        await Exam.findByIdAndDelete(id);
        res.status(200).json({message:"Exam Delete sucessfully "});
    }catch(error){
        res.status(500).json({message:"Error deleting exam ",error});
    }
};
const updateExam = async(req,res)=>{
    try{
        const {id} = req.params;
        const updatedExam = await Exam.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"Exam updated sucessfully",exam: updatedExam});
    }catch(error){
        res.status(500).json({message:"Error updating exam ",error});

    }
};

const getAllExams = async (req, res) => {
    try {
      const exams = await Exam.find();
      res.status(200).json({ message: "Exams retrieved successfully", exams });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving exams", error });
    }
  };


  const getExamById = async (req, res) => {
    try {
        const { id } = req.params;
        const exam = await Exam.findById(id);
        
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        res.status(200).json({ message: "Exam retrieved successfully", exam });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving exam", error });
    }
};


module.exports = {updateExam,deleteExam,addExam,getAllExams,getExamById}; 