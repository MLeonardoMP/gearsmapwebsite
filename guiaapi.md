# Guía de Uso de las APIs de GearsMap

Esta guía describe las diferentes APIs disponibles en la aplicación GearsMap y cómo utilizarlas correctamente. Las APIs proporcionan acceso a datos geográficos, estadísticas, información de producción y actividades de la ACGGP en Colombia.

**URL Base**: `https://gearsmap.com/api`

## Índice
1. [API de Departamentos](#1-api-de-departamentos)
2. [API de Municipios](#2-api-de-municipios)
3. [API de Geometrías de Departamentos](#3-api-de-geometrías-de-departamentos)
4. [API de Geometrías de Municipios](#4-api-de-geometrías-de-municipios)
5. [API de Estadísticas Departamentales](#5-api-de-estadísticas-departamentales-y-municipales)
6. [API de Datos ACGGP](#6-api-de-datos-acggp)
7. [API de Producción](#7-api-de-producción)
8. [API de Producción Departamental por Año](#8-api-de-producción-departamental-por-año)
9. [API de Actividades ACGGP Departamental por Año](#9-api-de-actividades-acggp-departamental-por-año)

---

## 1. API de Departamentos

Permite obtener información básica de los departamentos incluyendo coordenadas x,y (centroide) pero sin la geometría completa.

### Endpoints:

#### Obtener todos los departamentos
```
GET https://gearsmap.com/api/departamentos
```

**Respuesta**: Lista de departamentos con sus coordenadas x,y.

#### Obtener un departamento específico
```
GET https://gearsmap.com/api/departamentos?departamento_id=68
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento

**Respuesta**: Datos del departamento específico con sus coordenadas x,y.

---

## 2. API de Municipios

Permite obtener información básica de los municipios incluyendo coordenadas x,y (centroide) pero sin la geometría completa.

### Endpoints:

#### Obtener todos los municipios
```
GET https://gearsmap.com/api/municipios
```

**Respuesta**: Lista de municipios con sus coordenadas x,y.

#### Obtener un municipio específico
```
GET https://gearsmap.com/api/municipios?municipio_id=68001
```

**Parámetros**:
- `municipio_id`: Código DANE del municipio

**Respuesta**: Datos del municipio específico con sus coordenadas x,y.

#### Obtener municipios de un departamento
```
GET https://gearsmap.com/api/municipios?departamento_id=68
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento

**Respuesta**: Lista de municipios del departamento especificado con sus coordenadas x,y.

---

## 3. API de Geometrías de Departamentos

Devuelve las geometrías completas (geom) de los departamentos para su uso en representación cartográfica.

### Endpoints:

#### Obtener todas las geometrías de departamentos
```
GET https://gearsmap.com/api/geoms-departamentos
```

**Respuesta**: Lista de departamentos con sus geometrías completas para representación en mapas.

#### Obtener la geometría de un departamento específico
```
GET https://gearsmap.com/api/geoms-departamentos?departamento_id=68
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento

**Respuesta**: Geometría completa del departamento específico para representación en mapas.

---

## 4. API de Geometrías de Municipios

Devuelve las geometrías completas (geom) de los municipios para su uso en representación cartográfica. Implementa paginación para evitar timeouts debido al tamaño de los datos.

### Endpoints:

#### Obtener información básica de todos los municipios (sin geometrías)
```
GET https://gearsmap.com/api/geoms-municipios
```

**Respuesta**: Lista de municipios con información básica, sin incluir geometrías completas.

#### Obtener la geometría de un municipio específico
```
GET https://gearsmap.com/api/geoms-municipios?municipio_id=68001
```

**Parámetros**:
- `municipio_id`: Código DANE del municipio

**Respuesta**: Geometría completa del municipio específico para representación en mapas.

#### Obtener geometrías de municipios de un departamento (paginado)
```
GET https://gearsmap.com/api/geoms-municipios?departamento_id=11
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento
- `page` (opcional): Número de página (por defecto: 1)
- `limit` (opcional): Cantidad de municipios por página (por defecto: 20)

**Ejemplo con paginación**:
```
GET https://gearsmap.com/api/geoms-municipios?departamento_id=68&page=2
GET https://gearsmap.com/api/geoms-municipios?departamento_id=68&limit=5
```

**Respuesta**: Geometrías completas de los municipios del departamento especificado, con información de paginación.

---

## 5. API de Estadísticas Departamentales y Municipales

Proporciona estadísticas detalladas a nivel departamental y municipal. Para municipios, busca primero el departamento asociado y devuelve sus estadísticas.

### Endpoints:

#### Obtener todas las estadísticas departamentales
```
GET https://gearsmap.com/api/estadisticas-departamentales
```

**Respuesta**: Lista de estadísticas para todos los departamentos.

#### Obtener estadísticas de un departamento específico
```
GET https://gearsmap.com/api/estadisticas-departamentales?departamento_id=68
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento

**Respuesta**: Estadísticas detalladas del departamento específico.

#### Obtener estadísticas asociadas a un municipio
```
GET https://gearsmap.com/api/estadisticas-departamentales?municipio_id=68655
```

**Parámetros**:
- `municipio_id`: Código DANE del municipio

**Respuesta**: Estadísticas del departamento al que pertenece el municipio especificado.

---

## 6. API de Datos ACGGP

Proporciona registros de actividades de la ACGGP (Asociación Colombiana de Geólogos y Geofísicos del Petróleo) con filtros por ubicación geográfica.

### Endpoints:

#### Obtener todos los registros ACGGP
```
GET https://gearsmap.com/api/datos-acggp
```

**Respuesta**: Lista de todos los registros de actividades de la ACGGP.

#### Filtrar por municipio
```
GET https://gearsmap.com/api/datos-acggp?municipio_id=68655
```

**Parámetros**:
- `municipio_id`: Código DANE del municipio

**Respuesta**: Registros de actividades de la ACGGP en el municipio específico.

#### Filtrar por departamento
```
GET https://gearsmap.com/api/datos-acggp?departamento_id=68
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento

**Respuesta**: Registros de actividades de la ACGGP en el departamento específico.

---

## 7. API de Producción

Proporciona datos de producción petrolera y gasífera con múltiples opciones de filtrado y combinaciones.

### Endpoints:

#### Obtener todos los datos de producción
```
GET https://gearsmap.com/api/produccion
```

**Respuesta**: Lista completa de datos de producción.

#### Filtrar por ubicación

```
GET https://gearsmap.com/api/produccion?municipio_id=68655
GET https://gearsmap.com/api/produccion?departamento_id=68
```

**Parámetros**:
- `municipio_id`: Código DANE del municipio
- `departamento_id`: Código DANE del departamento

#### Filtrar por recurso
```
GET https://gearsmap.com/api/produccion?recurso=petroleo
```

**Parámetros**:
- `recurso`: Tipo de recurso (petroleo, gas, etc.)

#### Filtrar por período
```
GET https://gearsmap.com/api/produccion?anio=2024
GET https://gearsmap.com/api/produccion?anio=2024&mes=enero
```

**Parámetros**:
- `anio`: Año de producción
- `mes`: Mes de producción

#### Filtros combinados
```
GET https://gearsmap.com/api/produccion?municipio_id=68001&anio=2024&mes=enero
GET https://gearsmap.com/api/produccion?departamento_id=68&recurso=gas
GET https://gearsmap.com/api/produccion?municipio_id=68001&departamento_id=68&recurso=petroleo&anio=2024&mes=febrero
```

**Respuesta**: Datos de producción filtrados según los parámetros especificados.

---

## 8. API de Producción Departamental por Año

Proporciona datos agregados de producción a nivel departamental por año, incluyendo información sobre recursos, producción total y número de campos, operadoras y contratos.

### Endpoints:

#### Obtener todos los datos de producción departamental
```
GET https://gearsmap.com/api/produccion-departamental
```

**Respuesta**: Lista completa de datos de producción departamental agregados por año.

#### Filtrar por departamento_id
```
GET https://gearsmap.com/api/produccion-departamental?departamento_id=68
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento

**Respuesta**: Datos de producción para el departamento específico, para todos los años.

#### Filtrar por año
```
GET https://gearsmap.com/api/produccion-departamental?anio=2022
```

**Parámetros**:
- `anio`: Año de producción

**Respuesta**: Datos de producción de todos los departamentos para el año especificado.

#### Filtrar por departamento_id y año
```
GET https://gearsmap.com/api/produccion-departamental?departamento_id=68&anio=2022
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento
- `anio`: Año de producción

**Respuesta**: Datos de producción para el departamento y año específicos.

---

## 9. API de Actividades ACGGP Departamental por Año

Proporciona datos agregados de actividades de la ACGGP a nivel departamental por año, incluyendo número de participantes, tipos de actividades y detalles de participación.

### Endpoints:

#### Obtener todos los datos de actividades ACGGP departamental
```
GET https://gearsmap.com/api/acggp-departamental
```

**Respuesta**: Lista completa de datos de actividades ACGGP departamentales agregados por año.

#### Filtrar por departamento_id
```
GET https://gearsmap.com/api/acggp-departamental?departamento_id=68
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento

**Respuesta**: Datos de actividades ACGGP para el departamento específico, para todos los años.

#### Filtrar por año
```
GET https://gearsmap.com/api/acggp-departamental?anio=2022
```

**Parámetros**:
- `anio`: Año de las actividades

**Respuesta**: Datos de actividades ACGGP de todos los departamentos para el año especificado.

#### Filtrar por departamento_id y año
```
GET https://gearsmap.com/api/acggp-departamental?departamento_id=68&anio=2022
```

**Parámetros**:
- `departamento_id`: Código DANE del departamento
- `anio`: Año de las actividades

**Respuesta**: Datos de actividades ACGGP para el departamento y año específicos.

---

## Códigos de estado

- **200**: Éxito - La solicitud se completó correctamente
- **404**: No encontrado - El recurso solicitado no existe
- **500**: Error interno del servidor - Error al procesar la solicitud

## Formato de respuesta

Todas las APIs devuelven respuestas en formato JSON.

## Ejemplos de implementación

### Ejemplo en JavaScript (Fetch API)
```javascript
fetch('https://gearsmap.com/api/departamentos')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Ejemplo en Next.js/TypeScript
```typescript
// Ejemplo de un componente que muestra departamentos en Next.js
import { useState, useEffect } from 'react';

// Definir interfaz para los departamentos
interface Departamento {
  gid: number;
  departamento_id: string;
  departamento: string;
  area_departamento: number;
  x: number;
  y: number;
}

export default function DepartamentosComponent() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener datos de la API
    const fetchDepartamentos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://gearsmap.com/api/departamentos');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setDepartamentos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartamentos();
  }, []);

  if (loading) return <div>Cargando departamentos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Departamentos de Colombia</h1>
      <ul>
        {departamentos.map((depto) => (
          <li key={depto.departamento_id}>
            {depto.departamento} - Coordenadas: ({depto.x.toFixed(4)}, {depto.y.toFixed(4)})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Ejemplo en Python (Requests)
```python
import requests

response = requests.get('https://gearsmap.com/api/departamentos')
data = response.json()
print(data)
```

---

Para más información o soporte técnico, contacte a soporte@gearsmap.com
