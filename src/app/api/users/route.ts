import { NextResponse, NextRequest } from "next/server";
import { Client, Users } from "node-appwrite";

const client = new Client();

client
    .setEndpoint('https://baas.powermap.live/v1') //https://apigw.aapico.com/v1
    .setProject('66fcfea30036daf8a759') // Replace with your project ID
    .setKey('effb2640cf81a2ee3882e5773f5161a034ced6abe9f309c8794726937d5d0def4a03852ef9653353db0c7891799c56cd8a67ebe4814209aadba871e47d6fb6fefa0aed41e2130e8590af32861c5c1bdbd2932b33f106886964e24a76024e328a29b792c822af5ab06b1fd4d6f034810dfb59735c27bd1b8449c735835de690de'); // Your secret API key

const users = new Users(client);

export async function GET(req: NextRequest) {
  try {
    const allUsers = await users.list();
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("req =", req);
    let userUpdateEmail, userUpdateUsername;
    const { userId, email, name } = await req.json();
    if(email !== null){
      userUpdateEmail = await users.updateEmail(userId, email);
    }
    if(name != null){
      userUpdateUsername = await users.updateName(userId, name);
    }
    return NextResponse.json({userUpdateEmail, userUpdateUsername}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const deleteResult = await users.delete(userId);
    return NextResponse.json({ results: deleteResult }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// -- Delete several Users at once
// export async function DELETE(req: NextRequest) {
//   try {
//     const { userIds } = await req.json(); // Expecting an array of user IDs

//     if (!Array.isArray(userIds) || userIds.length === 0) {
//       return NextResponse.json(
//         { message: 'Invalid input. Provide an array of user IDs.' },
//         { status: 400 }
//       );
//     }

//     const deleteResults = [];
//     for (const userId of userIds) {
//       try {
//         await users.delete(userId); // Delete each user
//         deleteResults.push({ userId, status: 'success' });
//       } catch (error: any) {
//         deleteResults.push({ userId, status: 'failed', error: error.message });
//       }
//     }

//     return NextResponse.json({ results: deleteResults }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }


