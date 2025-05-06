import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    // Obtener la URL de la solicitud
    const { searchParams } = new URL(request.url);
    
    // Verificar si se proporciona un departamento_id
    const departamentoId = searchParams.get('departamento_id');
    
    if (departamentoId) {
      // Si hay un ID, retornar solo ese departamento
      const result = await sql`
        SELECT gid, departamento_id, departamento, area_departamento, geom 
        FROM departamentos
        WHERE departamento_id = ${departamentoId}
      `;
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Departamento no encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(result.rows[0], { status: 200 });
    } else {
      // Si no hay ID, retornar todos los departamentos
      const result = await sql`
        SELECT gid, departamento_id, departamento, area_departamento, geom 
        FROM departamentos
        ORDER BY departamento
      `;
      
      return NextResponse.json(result.rows, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener departamentos' }, { status: 500 });
  }
}