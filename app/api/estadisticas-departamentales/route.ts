import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    // Obtener la URL de la solicitud
    const { searchParams } = new URL(request.url);
    
    // Verificar si se proporciona un departamento_id
    const departamentoId = searchParams.get('departamento_id');
    
    if (departamentoId) {
      // Si hay un ID, retornar solo las estadísticas de ese departamento
      const result = await sql`
        SELECT 
          departamento_id,
          departamento,
          area_departamento,
          total_pozos,
          total_rezumaderos_sin_definir,
          total_rezumaderos_activo,
          total_rezumaderos_semiactivo,
          total_rezumaderos_inactivo,
          total_rezumaderos,
          total_sismica_2d,
          conteo_sismica_3d,
          total_sismica_3d_km2,
          total_area,
          porcentaje_sismica_3d,
          conteo_tierras_exploracion,
          conteo_tierras_produccion,
          area_tierras_exploracion_km2,
          porcentaje_tierras_exploracion,
          area_tierras_produccion_km2,
          porcentaje_tierras_produccion,
          conteo_tierras,
          area_tierras_km2,
          porcentaje_tierras,
          total_ppr
        FROM estadisticas_departamentales
        WHERE departamento_id = ${departamentoId}
      `;
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Estadísticas departamentales no encontradas' }, { status: 404 });
      }
      
      return NextResponse.json(result.rows[0], { status: 200 });
    } else {
      // Si no hay ID, retornar todas las estadísticas departamentales
      const result = await sql`
        SELECT 
          departamento_id,
          departamento,
          area_departamento,
          total_pozos,
          total_rezumaderos_sin_definir,
          total_rezumaderos_activo,
          total_rezumaderos_semiactivo,
          total_rezumaderos_inactivo,
          total_rezumaderos,
          total_sismica_2d,
          conteo_sismica_3d,
          total_sismica_3d_km2,
          total_area,
          porcentaje_sismica_3d,
          conteo_tierras_exploracion,
          conteo_tierras_produccion,
          area_tierras_exploracion_km2,
          porcentaje_tierras_exploracion,
          area_tierras_produccion_km2,
          porcentaje_tierras_produccion,
          conteo_tierras,
          area_tierras_km2,
          porcentaje_tierras,
          total_ppr
        FROM estadisticas_departamentales
        ORDER BY departamento
      `;
      
      return NextResponse.json(result.rows, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al obtener estadísticas departamentales' }, { status: 500 });
  }
}