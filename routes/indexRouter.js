import customerRoutes from './customerRouter.js';
import merchantRoutes from './merchantRouter.js';
import adminRoutes from './adminRouter.js';

function route() {
    app.use('/customer', customerRoutes);

    app.use('/merchant', merchantRoutes);

    app.use('/admin', adminRoutes);

    app.use('/', userRoutes);
}

export default route;
