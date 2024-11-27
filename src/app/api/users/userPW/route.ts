import { NextResponse, NextRequest } from "next/server";
import { Client, Users } from "node-appwrite";

const client = new Client();

client
    .setEndpoint('https://baas.powermap.live/v1') //https://apigw.aapico.com/v1
    .setProject('66fcfea30036daf8a759') // Replace with your project ID
    .setKey('effb2640cf81a2ee3882e5773f5161a034ced6abe9f309c8794726937d5d0def4a03852ef9653353db0c7891799c56cd8a67ebe4814209aadba871e47d6fb6fefa0aed41e2130e8590af32861c5c1bdbd2932b33f106886964e24a76024e328a29b792c822af5ab06b1fd4d6f034810dfb59735c27bd1b8449c735835de690de'); // Your secret API key

const users = new Users(client);

export async function PATCH(req: NextRequest) {
    try {
      console.log("req =", req);
      const { userId, pw } = await req.json();
      const userUpdatePassword = await users.updatePassword(userId, pw);
      return NextResponse.json(userUpdatePassword, {status: 200});
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
}