const controller = {};

controller.home = (req, res) => {
    res.render('customer/index');
}

export default controller;