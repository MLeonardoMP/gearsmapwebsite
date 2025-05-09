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
      // Si hay un ID de municipio, retornar solo la geometría de ese municipio
      const result = await sql`
        SELECT municipio_id, departamento_id, municipio, geom
        FROM municipios
        WHERE municipio_id = ${municipioId}
      `;
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Geometría del municipio no encontrada' }, { status: 404 });
      }
      
      return NextResponse.json(result.rows[0], { status: 200 });    } else if (departamentoId) {
      // Si hay un ID de departamento, retornar las geometrías de municipios de ese departamento
      // Añadimos soporte para paginación para evitar problemas con departamentos grandes
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const offset = (page - 1) * limit;
      
      // Primero obtenemos el conteo total para información de paginación
      const countResult = await sql`
        SELECT COUNT(*) as total
        FROM municipios
        WHERE departamento_id = ${departamentoId}
      `;
      
      const total = parseInt(countResult.rows[0].total);
      
      // Luego obtenemos los municipios con paginación
      const result = await sql`
        SELECT municipio_id, departamento_id, municipio, geom
        FROM municipios
        WHERE departamento_id = ${departamentoId}
        ORDER BY municipio
        LIMIT ${limit} OFFSET ${offset}
      `;
      
      if (result.rows.length === 0 && page === 1) {
        return NextResponse.json({ error: 'No se encontraron geometrías de municipios para este departamento' }, { status: 404 });
      }
      
      return NextResponse.json({
        data: result.rows,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }, { status: 200 });} else {
      // El retorno de todas las geometrías de municipios puede ser muy pesado
      // Limitaremos a solo información básica sin geometrías
      const result = await sql`
        SELECT municipio_id, departamento_id, municipio
        FROM municipios
        ORDER BY departamento_id, municipio
      `;
      
      return NextResponse.json({
        message: "Por favor, especifica un municipio_id o departamento_id para obtener geometrías. Retornando solo información básica.",
        data: result.rows
      }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener geometrías de municipios' }, { status: 500 });
  }
}