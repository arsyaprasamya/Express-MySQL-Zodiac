var router = require('express').Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'jc06_mysql',
    password: '08520852',
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

router.post('/karyawan', (req, res)=>{
    var a = new Date()
    var tahun = a.getFullYear();
    var namaKu = req.body.nama;
    var hariKu = req.body.tglLahir.substr(0,2)
    var bulanKu = req.body.tglLahir.substr(3,2)
    var tahunKu = req.body.tglLahir.substr(6,4)
    var zodiakKu = ["Capricorn",
                        "Aquarius",
                        "Pisces",
                        "Aries",
                        "Taurus",
                        "Gemini",
                        "Cancer",
                        "Leo",
                        "Virgo",
                        "Libra",
                        "Scorpio",
                        "Sagitarius"];
    var usiaKu = tahun - tahunKu
    
    var zodiakTampung = "";
    switch(bulanKu)
    {
        case 1: {
                if(hariKu < 20)
                    zodiakTampung = zodiakKu[0];
                else
                    zodiakTampung = zodiakKu[1];
                }
                break;
        case 2: {
                if(hariKu < 19)
                    zodiakTampung = zodiakKu[1];
                else
                    zodiakTampung = zodiakKu[2];
                }
                break;
        case 3: {
                if(hariKu < 21)
                    zodiakTampung = zodiakKu[2];
                else
                    zodiakTampung = zodiakKu[3];
                }
                break;
        case 4: {
                if(hariKu < 20)
                    zodiakTampung = zodiakKu[3];
                else
                    zodiakTampung = zodiakKu[4];
                }
                break;
        case 5: {
                if(hariKu < 21)
                    zodiakTampung = zodiakKu[4];
                else
                    zodiakTampung = zodiakKu[5];
                }
                break;
        case 6: {
                if(hariKu < 21)
                    zodiakTampung = zodiakKu[5];
                else
                    zodiakTampung = zodiakKu[6];
                }
                break;
        case 7: {
                if(hariKu < 23)
                    zodiakTampung = zodiakKu[6];
                else
                    zodiakTampung = zodiakKu[7];
                }
                break;
        case 8: {
                if(hariKu < 23)
                    zodiakTampung = zodiakKu[7];
                else
                    zodiakTampung = zodiakKu[8];
                }
                break;
        case 9: {
                if(hariKu < 23)
                    zodiakTampung = zodiakKu[8];
                else
                    zodiakTampung = zodiakKu[9];
                }
                break;
        case 10: {
                if(hariKu < 23)
                    zodiakTampung = zodiakKu[9];
                else
                    zodiakTampung = zodiakKu[10];
                }
                break;
        case 11: {
                if(hariKu < 22)
                    zodiakTampung = zodiakKu[10];
                else
                    zodiakTampung = zodiakKu[11];
                }
                break;
        case 12: {
                if(hariKu < 22)
                    zodiakTampung = zodiakKu[11];
                else
                    zodiakTampung = zodiakKu[0];
                }
                break;
    }

    var data = {
        no: 6,
        nama: namaKu,
        hari: hariKu,
        bulan: bulanKu,
        tahun: tahunKu,
        zodiak: zodiakTampung,
        usia: usiaKu
    }

    var sql = 'insert into karyawan set ?';
    db.query(sql, data, (error, hasil) => {
        if (error) throw error;
        console.log(hasil)
        res.send({status: 'Data berhasil ditambah!'})
    });
})

module.exports = router;