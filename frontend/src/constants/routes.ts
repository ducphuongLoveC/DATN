const path = {
  admin: {
    dashboards: '/dashboards',
    courses: '/courses',
    newCourse: '/courses/new',
    listCategory: '/category',
    listContent: '/content',
    addContent: '/content/add',
    updateCourse: '/courses/:id/update',
    LearningPathList: '/learning-path',
    newLearningPath: '/learning-path/new',
    posts: '/posts',
    newPosts: '/posts/new',
    transaction: '/transaction',
    transactionHistory: '/transaction/history',
    statistics: '/statistics',
    profiles: '/profiles',
    profile: '/profile',
    hr: '/hr',
    studentList: '/student-list',
    categorys: '/categorys',
    Articlecategorys: '/categorys/article',
  },
  client: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },
    learning: '/learning/:id/',
    learningPath: '/learning-path',
    learningPathDetail: '/learning-path-detail',
    courses: '/courses/:id',
    logAuth: 'log-auth',
    news: '/news',
    newsDetail: '/news-detail',
    contact: '/contact',
    profile: '/profile',
    setting: '/setting',
    newPost: '/new-post',
    myPost: '/my-post',
    bookmark: '/me/bookmark',
  },
};
export default path;
