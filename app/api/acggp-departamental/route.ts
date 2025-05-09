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
    if (departamentoId && anio) {      // Filtrar por departamento_id y año
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          total_participantes,
          numero_aliados,
          numero_actividades,
          participantes_estudiantes,
          participantes_gobernadores,
          participantes_poblacion_civil,
          participantes_profesores_de_colegio,
          "actividad_capacitación",
          actividad_consultoria,
          actividad_taller
        FROM acggp_deps_anio
        WHERE departamento_id = ${parseInt(departamentoId)} AND anio = ${anio}
      `;
    } else if (departamentoId) {
      // Filtrar solo por departamento_id
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          total_participantes,
          numero_aliados,
          numero_actividades,
          participantes_estudiantes,
          participantes_gobernadores,
          participantes_poblacion_civil,
          participantes_profesores_de_colegio,
          "actividad_capacitación",
          actividad_consultoria,
          actividad_taller
        FROM acggp_deps_anio
        WHERE departamento_id = ${parseInt(departamentoId)}
        ORDER BY anio DESC
      `;
    } else if (anio) {      // Filtrar solo por año
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          total_participantes,
          numero_aliados,
          numero_actividades,
          participantes_estudiantes,
          participantes_gobernadores,
          participantes_poblacion_civil,
          participantes_profesores_de_colegio,
          "actividad_capacitación",
          actividad_consultoria,
          actividad_taller
        FROM acggp_deps_anio
        WHERE anio = ${anio}
        ORDER BY departamento
      `;
    } else {
      // Sin filtros, obtener todos los registros
      result = await sql`
        SELECT 
          departamento_id, 
          departamento, 
          anio, 
          total_participantes,
          numero_aliados,
          numero_actividades,
          participantes_estudiantes,
          participantes_gobernadores,
          participantes_poblacion_civil,
          participantes_profesores_de_colegio,
          "actividad_capacitación",
          actividad_consultoria,
          actividad_taller
        FROM acggp_deps_anio
        ORDER BY departamento, anio DESC
      `;
    }
    
    return NextResponse.json(result.rows, { status: 200 });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener datos ACGGP departamental' }, { status: 500 });
  }
}
