const { Company } = require("../models");


// Create Company

exports.createCompany = async(req,res)=>{

    try{

        const { userId, name, address, phone, email, taxNumber } = req.body;

        const company = await Company.create({

            userId,
            name,
            address,
            phone,
            email,
            taxNumber

        });


        res.status(201).json({
            message:"Company created",
            company
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};


exports.getCompany = async(req,res)=>{

    try{

        const company = await Company.findByPk(
            req.params.id
        );


        if(!company){

            return res.status(404).json({
                message:"Company not found"
            });

        }


        res.json(company);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};