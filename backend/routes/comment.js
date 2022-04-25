const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

//create new ItemStore
router.post('/store', upload.array("productImage", 5), async function (req, res, next) {
    if (req.method == "POST") {
        const file = req.files[0].path.substring(6);
        console.log(file)
        if (!file) {
            return res.status(400).json({ message: "Please upload a file" });
        }
        const type = req.body.type
        const brand = req.body.brand
        const price = req.body.price
        const quantity = req.body.quantity

        const conn = await pool.getConnection();
        // Begin transaction
        await conn.beginTransaction();
        try {
            const [rows1, fields1] = await conn.query(
                'INSERT INTO `store` ( `type`, `name`, `price`, `quantity`, `url`) VALUES ( ?, ?, ?,?,?)', [type, brand, price, quantity, file]
            )
            const [rows2, fields2] = await conn.query(
                'SELECT * FROM `store` WHERE `id` = ?',
                [rows1.insertId]
            )
            await conn.commit()
            return res.json(rows2[0])
        } catch (err) {
            await conn.rollback();
            return res.status(400).json(err);
        } finally {
            console.log("finally");
            conn.release();
        }
    }



    // type = req.body.type
    // Name = req.body.name
    // price = req.body.price
    // url = req.body.url
    // quantity = req.body.quantity
    // const conn = await pool.getConnection()
    // // Begin transaction
    // await conn.beginTransaction();
    // try {
    //     const [rows1, fields1] = await conn.query(
    //         'INSERT INTO `store` ( `type`, `name`, `price`, `url`, `quantity`) VALUES ( ?, ?, ?,?,?)', [type, Name, price, url, quantity]
    //     )
    //     const [rows2, fields2] = await conn.query(
    //         'SELECT * FROM `store` WHERE `id` = ?',
    //         [rows1.insertId]
    //     )
    //     await conn.commit()
    //     return res.json(rows2[0])
    // } catch (err) {
    //     await conn.rollback();
    //     return res.status(500).json(err)
    // } finally {
    //     console.log('finally')
    //     conn.release();
    // }
});

router.delete("/product/:blogId", async function (req, res, next) {
    // Your code here
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    try {
        // Delete the selected blog
        const [
            rows2,
            fields2,
        ] = await conn.query("DELETE FROM `store` WHERE `id` = ?", [
            req.params.blogId,
        ]);

        if (rows2.affectedRows === 1) {
            await conn.commit();
            res.status(204).send();
        } else {
            throw "Cannot delete the selected blog";
        }
    } catch (err) {
        console.log(err)
        await conn.rollback();
        return res.status(500).json(err);
    } finally {
        conn.release();
    }
});

router.put('/update/product', async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const id = req.body.id
    const price = req.body.price
    const quantity = req.body.quantity

    try {
        await pool.query(
            'UPDATE store SET price=? WHERE id=?', [price, id]
        )
        await pool.query(
            'UPDATE store SET quantity=? WHERE id=?', [quantity, id]
        )
        await conn.commit()
        res.send("success!");
    } catch (error) {
        res.status(500).json(error)
    }
    finally {
        console.log('finally')
        conn.release();
    }
});

router.post('/checkout/product', async function (req, res, next) {
    if (req.method == "POST") {
        const name = req.body.name;
        const price = req.body.price;
        const type = req.body.type;
        const url = req.body.url;
        const amount = req.body.amount;
        const username = req.body.username;

        const conn = await pool.getConnection();
        // Begin transaction
        await conn.beginTransaction();
        try {
            await conn.query(
                'INSERT INTO `selectProduct` ( `type`, `name`, `price`, `url`,`amount`,`username`) VALUES ( ?, ?, ?,?,?,?)', [type, name, price, url, amount, username]
            )
            await conn.commit()
            res.send("success!");
        } catch (err) {
            await conn.rollback();
            return res.status(400).json(err);
        } finally {
            console.log("finally");
            conn.release();
        }
    }
});

//Stadium1
router.put('/update/stadiumStatus', async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const id = req.body.id
    const status = req.body.status
    const username = req.body.username

    try {
        await pool.query(
            'UPDATE stadium1 SET status=? WHERE id=?', [status, id]
        )
        await pool.query(
            'UPDATE stadium1 SET username=? WHERE id=?', [username, id]
        )
        await conn.commit()
        res.send("success!");
    } catch (error) {
        res.status(500).json(error)
    }
    finally {
        console.log('finally')
        conn.release();
    }
});

//Stadium2
router.put('/update/stadium2Status', async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const id = req.body.id
    const status = req.body.status
    const username = req.body.username

    try {
        await pool.query(
            'UPDATE stadium2 SET status=? WHERE id=?', [status, id]
        )
        await pool.query(
            'UPDATE stadium2 SET username=? WHERE id=?', [username, id]
        )
        await conn.commit()
        res.send("success!");
    } catch (error) {
        res.status(500).json(error)
    }
    finally {
        console.log('finally')
        conn.release();
    }
});
//addPromo
router.post('/addPromo', async function (req, res, next) {
    if (req.method == "POST") {
        const code = req.body.code
        const who = req.body.who
        const discount = req.body.discount

        const conn = await pool.getConnection();
        // Begin transaction
        await conn.beginTransaction();
        try {
            await conn.query(
                'INSERT INTO `promotions` (  `promotion_name`, `promotion_code`, `promotion_rate`) VALUES ( ?, ?, ?)', [who, code, discount]
            )
            await conn.commit()
            return res.json("success")
        } catch (err) {
            await conn.rollback();
            return res.status(400).json(err);
        } finally {
            console.log("finally");
            conn.release();
        }
    }
});

//deleteCode
router.delete("/code/:blogId", async function (req, res, next) {
    // Your code here
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    try {
        // Delete the selected blog
        await conn.query("DELETE FROM `promotions` WHERE `id` = ?", [
            req.params.blogId,
        ]);
    } catch (err) {
        console.log(err)
        await conn.rollback();
        return res.status(500).json(err);
    } finally {
        conn.release();
    }
});

//deletebooking
router.post("/delete/bookingst1", async function (req, res, next) {
    // Your code here
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    const id = req.body.id;
    try {
        // Delete the selected blog
        await conn.query('UPDATE stadium1 SET status=? WHERE id=?', ["empty", id])
        await conn.query('UPDATE stadium1 SET username=? WHERE id=?', ["", id])
        await conn.commit()
        res.send("success!");
    } catch (error) {
        res.status(500).json(error)
    }
    finally {
        console.log('finally')
        conn.release();
    }
});

router.post("/delete/bookingst2", async function (req, res, next) {
    // Your code here
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();

    const id = req.body.id;
    try {
        // Delete the selected blog
        await conn.query('UPDATE stadium2 SET status=? WHERE id=?', ["empty", id])
        await conn.query('UPDATE stadium2 SET username=? WHERE id=?', ["", id])
        await conn.commit()
        res.send("success!");
    } catch (error) {
        res.status(500).json(error)
    }
    finally {
        console.log('finally')
        conn.release();
    }
});
exports.router = router