export async function GET() {
  try {
    const users = await db.user.findMany();
    const response = NextResponse.json(users);
    response.headers.set("Access-Control-Allow-Origin", "*"); // Permitir solicitudes de todos los orígenes
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
