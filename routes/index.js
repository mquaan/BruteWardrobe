import customerRoutes from "./customer.js";
import merchantRoutes from "./merchant.js";
import adminRoutes from "./admin.js";

function route(customerApp, merchantApp, adminApp) {
    customerApp.use('/', customerRoutes);

    merchantApp.use('/', merchantRoutes);

    adminApp.use('/', adminRoutes);
}

export default route;