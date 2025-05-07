import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    // Obtener la URL de la solicitud
    const { searchParams } = new URL(request.url);
    
    // Obtener todos los posibles parámetros de filtrado
    const municipioId = searchParams.get('municipio_id');
    const departamentoId = searchParams.get('departamento_id');
    const recurso = searchParams.get('recurso');
    const anio = searchParams.get('anio');
    const mes = searchParams.get('mes');
    
    // Preparar la consulta base
    let result;
    
    // Aplicar los filtros según los parámetros proporcionados
    if (municipioId && departamentoId && recurso && anio && mes) {
      // Filtro por municipio, departamento, recurso, año y mes
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE municipio_id = ${municipioId}
          AND departamento_id = ${departamentoId}
          AND recurso = ${recurso}
          AND anio = ${parseInt(anio)}
          AND mes = ${mes}
        ORDER BY anio DESC, mes ASC
      `;
    } else if (municipioId && anio && mes) {
      // Filtro por municipio, año y mes
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE municipio_id = ${municipioId}
          AND anio = ${parseInt(anio)}
          AND mes = ${mes}
        ORDER BY anio DESC, mes ASC
      `;
    } else if (departamentoId && anio && mes) {
      // Filtro por departamento, año y mes
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE departamento_id = ${departamentoId}
          AND anio = ${parseInt(anio)}
          AND mes = ${mes}
        ORDER BY anio DESC, mes ASC
      `;
    } else if (recurso && anio && mes) {
      // Filtro por recurso, año y mes
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE recurso = ${recurso}
          AND anio = ${parseInt(anio)}
          AND mes = ${mes}
        ORDER BY anio DESC, mes ASC
      `;
    } else if (municipioId) {
      // Filtro solo por municipio
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE municipio_id = ${municipioId}
        ORDER BY anio DESC, mes ASC
      `;
    } else if (departamentoId) {
      // Filtro solo por departamento
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE departamento_id = ${departamentoId}
        ORDER BY anio DESC, mes ASC
      `;
    } else if (recurso) {
      // Filtro solo por recurso
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE recurso = ${recurso}
        ORDER BY anio DESC, mes ASC
      `;
    } else if (anio) {
      // Filtro solo por año
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE anio = ${parseInt(anio)}
        ORDER BY mes ASC
      `;
    } else if (anio && mes) {
      // Filtro por año y mes
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        WHERE anio = ${parseInt(anio)}
          AND mes = ${mes}
        ORDER BY departamento, municipio
      `;
    } else {
      // Sin filtros, obtener todos los registros
      result = await sql`
        SELECT 
          departamento, municipio, operadora, campo, contrato,
          anio, mes, produccion, recurso, municipio_id, departamento_id
        FROM produccion
        ORDER BY anio DESC, mes ASC
      `;
    }
    
    return NextResponse.json(result.rows, { status: 200 });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener datos de producción' }, { status: 500 });
  }
}