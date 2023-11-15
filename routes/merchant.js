import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Đây là dân');
    res.render('merchant/index.ejs')
})

export default router;