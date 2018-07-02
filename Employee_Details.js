var http=require("http");
var fs=require("fs");
var qs=require("querystring");

var MongoClient=require('mongodb').MongoClient;


http.createServer(function(req,res)
{
    if(req.method=="GET")
    {
        res.end(`<!Doctype html>
        <html>
            <head>
                <title>Employee Details</title>
            </head>
            <body>
            <h1>Employee Details</h1>
                <form action="/" method ="post">
                    <lable>EmpId</lable>
                    <input type="text" id="eId" name="eId" placeholder="Enter ID" required/>
                    <br/>
                    <label>EmpName</label>
                    <input type="text" id="eName" name="eName" placeholder="Enter EmpName" required/
                    <br/> <br/>
                    <label>BasicPay<label>
                    <input type="text" id="basicPay" name="basicPay" placeholder="Enter amount" required/>
                    <br/>


                    <button>SUBMIT</button>
                </form>
            </body>
        </html>`);
    }
    else if(req.method=="POST")
    {
       
        var body="";
        req.on("data",function(chunk)
    {
        body+=chunk;
        //console.log(data);
    });
    req.on("end",function()
    {
    var obj=qs.parse(body);
    console.log(obj.basicPay);
    eId=obj.eId;
    eName=obj.eName;
    //basicPay=obj.basicPay;

     basicPay=parseFloat(obj. basicPay); 
    grosspay=basicPay+(0.4)*basicPay;
    Netpay=grosspay-1000;


    res.end(`<!Doctype html>
    <html>
        <head>
            <title>Employee Details</title>
        </head>
        <body>
        <h1>Employee Details</h1>
            <form action="/" method ="post">
            <lable>EmpId</lable>
            <input type="text" id="eId" name="eId" placeholder="${eId}" required/>
            <br/>
            <label>EmpName</label>
            <input type="text" id="eName" name="eName" placeholder="${eName}" required/
            <br/> <br/>
            <label>BasicPay<label>
            <input type="text" id="basicPay" name="basicPay" placeholder="${basicPay}" required/>
            <br/>
            <label>Net Pay</label>
            <input type="text" id="Npay" name="Npay" value="${Netpay}" readonly/>
           

                
            </form>
        </body>
    </html>`);

    MongoClient.connect('mongodb://127.0.0.1:27017/product',function(err,db)
{
    if(err)
    {
        console.log(err);
    }
    var insertdoc = [{ EmpId:eId,EmpName:eName,Basicpay:basicPay,NetPay:Netpay}];
    db.collection('Employee Details').insertMany(insertdoc,function(err,result)
    {
        if(err) throw err;
        {
        console.log("document inserted sucessfully");
        }
    });
       
    db.close();
    
});

    //res.end("fahren = "+fahren.toString()+" celsius= "+celcius.toString());
    });
    
    }
}).listen(3000);
