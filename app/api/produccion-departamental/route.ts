import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    // Obtener la URL de la solicitud
    const { searchParams } = new URL(request.url);
    
    // Verificar si se proporciona un departamento_id
    const departamentoId = searchParams.get('departamento_id');
    const anio = searchParams.get('anio');
    
    let result;
    
    if (departamentoId && anio) {
      // Filtrar por departamento_id y año
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          recurso, 
          produccion_total,
          numero_campos,
          numero_operadoras,
          numero_contratos
        FROM production_deps_anio
        WHERE departamento_id = ${departamentoId} AND anio = ${anio}
        ORDER BY recurso
      `;
    } else if (departamentoId) {
      // Filtrar solo por departamento_id
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          recurso, 
          produccion_total,
          numero_campos,
          numero_operadoras,
          numero_contratos
        FROM production_deps_anio
        WHERE departamento_id = ${departamentoId}
        ORDER BY anio DESC, recurso
      `;
    } else if (anio) {
      // Filtrar solo por año
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          recurso, 
          produccion_total,
          numero_campos,
          numero_operadoras,
          numero_contratos
        FROM production_deps_anio
        WHERE anio = ${anio}
        ORDER BY departamento, recurso
      `;
    } else {
      // Sin filtros, obtener todos los registros
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          recurso, 
          produccion_total,
          numero_campos,
          numero_operadoras,
          numero_contratos
        FROM production_deps_anio
        ORDER BY departamento, anio DESC, recurso
      `;
    }
    
    return NextResponse.json(result.rows, { status: 200 });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener datos de producción departamental' }, { status: 500 });
  }
}
