import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    // Obtener la URL de la solicitud
    const { searchParams } = new URL(request.url);
    
    // Verificar si se proporciona un municipio_id o departamento_id
    const municipioId = searchParams.get('municipio_id');
    const departamentoId = searchParams.get('departamento_id');
    
    // Construir la consulta SQL según los parámetros proporcionados
    let query;
    let result;
    
    if (municipioId) {
      // Filtrar por municipio_id
      result = await sql`
        SELECT 
          aliado, proyecto, actividad, tematica, publico, anio,
          departamento, municipio, fecha_ejecucion_plan, fecha_ejecucion_real,
          numero_participantes, municipio_id, departamento_id
        FROM datos_acggp
        WHERE municipio_id = ${municipioId}
        ORDER BY fecha_ejecucion_real DESC
      `;
    } else if (departamentoId) {
      // Filtrar por departamento_id
      result = await sql`
        SELECT 
          aliado, proyecto, actividad, tematica, publico, anio,
          departamento, municipio, fecha_ejecucion_plan, fecha_ejecucion_real,
          numero_participantes, municipio_id, departamento_id
        FROM datos_acggp
        WHERE departamento_id = ${departamentoId}
        ORDER BY fecha_ejecucion_real DESC
      `;
    } else {
      // Sin filtros, obtener todos los registros
      result = await sql`
        SELECT 
          aliado, proyecto, actividad, tematica, publico, anio,
          departamento, municipio, fecha_ejecucion_plan, fecha_ejecucion_real,
          numero_participantes, municipio_id, departamento_id
        FROM datos_acggp
        ORDER BY fecha_ejecucion_real DESC
      `;
    }
    
    // Si no hay resultados, devolver una lista vacía en lugar de error
    return NextResponse.json(result.rows, { status: 200 });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener datos ACGGP' }, { status: 500 });
  }
}