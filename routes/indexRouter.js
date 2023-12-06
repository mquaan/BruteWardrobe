import customerRoutes from './customerRouter.js';
import merchantRoutes from './merchantRouter.js';
import adminRoutes from './adminRouter.js';

function route() {
    app.use('/customers', customerRoutes);

    app.use('/merchants', merchantRoutes);

    app.use('/admins', adminRoutes);

    app.use('/', userRoutes);
}

export default route;
