import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    // Obtener la URL de la solicitud
    const { searchParams } = new URL(request.url);
    
    // Verificar si se proporciona un municipio_id
    const municipioId = searchParams.get('municipio_id');
    // Verificar si se proporciona un departamento_id
    const departamentoId = searchParams.get('departamento_id');
    
    if (municipioId) {
      // Si hay un ID de municipio, retornar solo ese municipio con x e y
      const result = await sql`
        SELECT gid, municipio_id, departamento_id, departamento, municipio, x, y
        FROM municipios
        WHERE municipio_id = ${municipioId}
      `;
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Municipio no encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(result.rows[0], { status: 200 });
    } else if (departamentoId) {
      // Si hay un ID de departamento, retornar todos los municipios de ese departamento con x e y
      const result = await sql`
        SELECT gid, municipio_id, departamento_id, departamento, municipio, x, y
        FROM municipios
        WHERE departamento_id = ${departamentoId}
        ORDER BY municipio
      `;
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'No se encontraron municipios para este departamento' }, { status: 404 });
      }
      
      return NextResponse.json(result.rows, { status: 200 });
    } else {
      // Si no hay filtros, retornar todos los municipios con x e y
      const result = await sql`
        SELECT gid, municipio_id, departamento_id, departamento, municipio, x, y
        FROM municipios
        ORDER BY departamento, municipio
      `;
      
      return NextResponse.json(result.rows, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener municipios' }, { status: 500 });
  }
}