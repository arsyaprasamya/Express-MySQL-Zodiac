var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'toko'
})

router.use(bodyParser.json())

db.connect(()=>{
    console.log("Database telah terhubung ke MySQL!")
});

router.get('/karyawan', (req, res)=>{
    var sql = 'select * from karyawan';
    db.query(sql, (error, hasil)=>{
        if (error) throw error;
        console.log(hasil)
        res.send(hasil)
    });
})

router.post('/karyawan', (req, res) => {
    var tanggal = new Date();
    var tahun = tanggal.getFullYear();

    var namaTglLahir = {
        nama: req.body.nama,
        tglLahir: req.body.tglLahir
    }
    var name = namaTglLahir.nama
    var tanggalKu = namaTglLahir.tglLahir.split("-")


    function zodiakFunc(hariKu, bulanKu) {

        if ((bulanKu == 1 && hariKu <= 20) || (bulanKu == 12 && hariKu >= 22)) {
            var zodiakVar = "Capricorn"
            return zodiakVar;
        } else if ((bulanKu == 1 && hariKu >= 21) || (bulanKu == 2 && hariKu <= 18)) {
            var zodiakVar = "Aquarius"
            return zodiakVar;
        } else if ((bulanKu == 2 && hariKu >= 19) || (bulanKu == 3 && hariKu <= 20)) {
            var zodiakVar = "Pisces"
            return zodiakVar;
        } else if ((bulanKu == 3 && hariKu >= 21) || (bulanKu == 4 && hariKu <= 20)) {
            var zodiakVar = "Aries"
            return zodiakVar;
        } else if ((bulanKu == 4 && hariKu >= 21) || (bulanKu == 5 && hariKu <= 20)) {
            var zodiakVar = "Taurus"
            return zodiakVar;
        } else if ((bulanKu == 5 && hariKu >= 21) || (bulanKu == 6 && hariKu <= 20)) {
            var zodiakVar = "Gemini"
            return zodiakVar;
        } else if ((bulanKu == 6 && hariKu >= 22) || (bulanKu == 7 && hariKu <= 22)) {
            var zodiakVar = "Cancer"
            return zodiakVar;
        } else if ((bulanKu == 7 && hariKu >= 23) || (bulanKu == 8 && hariKu <= 23)) {
            var zodiakVar = "Leo"
            return zodiakVar;
        } else if ((bulanKu == 8 && hariKu >= 24) || (bulanKu == 9 && hariKu <= 23)) {
            var zodiakVar = "Virgo"
            return zodiakVar;
        } else if ((bulanKu == 9 && hariKu >= 24) || (bulanKu == 10 && hariKu <= 23)) {
            var zodiakVar = "Libra"
            return zodiakVar;
        } else if ((bulanKu == 10 && hariKu >= 24) || (bulanKu == 11 && hariKu <= 22)) {
            var zodiakVar = "Scorpio"
            return zodiakVar;
        } else if ((bulanKu == 11 && hariKu >= 23) || (bulanKu == 12 && hariKu <= 21)) {
            var zodiakVar = "Sagittarius"
            return zodiakVar;
        }
    }

    var umur = tahun - tanggalKu[2];

    var data = {
        nama: name,
        hari: tanggalKu[0],
        bulan: tanggalKu[1],
        tahun: tanggalKu[2],
        zodiak: zodiakFunc(tanggalKu[0], tanggalKu[1]),
        usia: umur
    }
    var masukKan = 'insert into karyawan set ?';
    db.query(masukKan, data, (err, result) => {
        if (err) throw err;
        console.log(data);
        res.send({
            status: 'Success',
            nama: name,
            hari: tanggalKu[0],
            bulan: tanggalKu[1],
            tahun: tanggalKu[2],
            zodiak: zodiakFunc(tanggalKu[0], tanggalKu[1]),
            usia: umur
        })
    });
});


module.exports = router;