import customerRoutes from "./customerRouter.js";
import merchantRoutes from "./merchantRouter.js";
import adminRoutes from "./adminRouter.js";

function route(customerApp, merchantApp, adminApp) {
    customerApp.use('/', customerRoutes);

    merchantApp.use('/', merchantRoutes);

    adminApp.use('/', adminRoutes);
}

export default route;