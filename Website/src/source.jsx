
export const SidebarData = (userRole) => {
  if (userRole === "admin") {
    return [
      {
        name_route: "Dashboard",
        path: "/admin/dashboard",
      },
      {
        name_route: "Manage Questions",
        subRoutes: [
          { name: "Add Question", path: "/admin/add-question" },
          { name: "View Question", path: "/admin/view-questions" },
        ],
      },
      {
        name_route: "Manage Exams",
        subRoutes: [
          { name: "Add Exam", path: "/admin/add-exam" },
          { name: "View Exams", path: "/admin/view-exams" },
        ],
      },
      {
        name_route: "Manage Users",
        subRoutes: [
          { name: "Add User", path: "/admin/add-user" },
          { name: "View Users", path: "/admin/view-users" },
        ],
      },
      {
        name_route: "Reports",
        path: "/admin/reports",
      },
      {
        name_route: "Settings",
        path: "/admin/settings",
      },
    ];
  } else {
    return [
      {
        name_route: "Dashboard",
        path: "/exam/dashboard",
      },
      {
        name_route: "Exam Sections",
        subRoutes: [
          { name: "Aptitude", path: "/exam/aptitude" },
          { name: "Reasoning", path: "/exam/reasoning" },
          { name: "Logical", path: "/exam/logical" },
          { name: "Verbal", path: "/exam/verbal" },
        ],
      },
      {
        name_route: "Exam History",
        path: "/exam/exam-history",
      },
      {
        name_route: "Profile",
        path: "/exam/profile",
      },
      {
        name_route: "Settings",
        path: "/exam/settings",
      },
    ];
  }
};
