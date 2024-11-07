import { NextResponse } from "next/server";
import db from '@/libs/db'
import bcrypt from 'bcrypt'

export async function POST(request) {
try {
    const data = await request.json();

    const userFound = await db.user.findUnique({
        where: {
            email: data.email
        }
        
    })

    const usernameFound = await db.user.findUnique({
        where:{
            username:data.username
        }
    })


    if(userFound){
        return NextResponse.json({
            message: "Correo ya existe"
        },{
            status:400
        })
    }
    if(usernameFound){
        return NextResponse.json({
            message: "Usuario ya existe"
        },{
            status:400
        })
    }

    console.log(data);

    const hashedPassword = await bcrypt.hash(data.password,10)
    const newUser = await db.user.create({
        data:{
            username:data.username,
            email:data.email,
            password:hashedPassword,
            rol:data.rol,
            estado:data.estado,
            nombres:data.nombres,
            
        }
    })

    const {password: _, ...user} = newUser
    return NextResponse.json(user);
} catch (error) {
    return NextResponse.json({
        message: error.message,
    },{
        status:500,
    })
}
}