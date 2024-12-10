import historyRoutes from '@app/modules/history/history.routes';
import lessonRoutes from '@app/modules/lesson/lesson.routes';
import userRoutes from '@app/modules/user/user.routes';
import vocabRoutes from '@app/modules/vocabulary/vacab.routes';
import { Router } from 'express';

const router = Router();

const routes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/history',
    route: historyRoutes,
  },
  {
    path: '/lesson',
    route: lessonRoutes,
  },
  {
    path: '/vocab',
    route: vocabRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
