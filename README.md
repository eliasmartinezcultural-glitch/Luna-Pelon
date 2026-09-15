# Luna Pelón

RPG de simulación de vida y aprendizaje histórico en pixel art.

## Concepto

Luna Pelón recorre un pequeño pueblo rural inspirado en el territorio real de San Patricio del Chañar. El juego es una **obra ficticia educativa**: Villa Pelón es el mundo narrativo; San Patricio del Chañar funciona como referencia territorial e histórica, no como afirmación de que los hechos ficticios ocurrieron allí.

## Mundo 8200

El mundo tiene **8200 × 8200 unidades** y una jerarquía geográfica fija:

1. **Pueblo**: núcleo pequeño y caminable.
2. **Chacras**: cinturón productivo alrededor del pueblo.
3. **Río**: más lejano, continuo y determinante para el territorio.
4. **Bardas**: relieve seco y elevado que define el paisaje.
5. **Picada 21**: asentamiento pequeño y distante; llegar requiere atravesar territorio.

## Leyes universales del juego

### 1. Ley del territorio
El territorio siempre existe aunque el jugador no lo mire. Pueblo, chacras, río, bardas y Picada 21 conservan su posición y función.

### 2. Ley de escala
Las distancias importan. Un lugar lejano debe sentirse lejano; viajar consume tiempo y convierte el desplazamiento en parte del juego.

### 3. Ley del tiempo
Los días avanzan. La hora modifica la experiencia y el mundo podrá incorporar posteriormente horarios de habitantes, apertura de lugares, descanso y actividades.

### 4. Ley de causa y consecuencia
Las acciones producen cambios. Hablar, ayudar, ignorar, investigar o equivocarse debe modificar relaciones, conocimiento, oportunidades o información disponible.

### 5. Ley de memoria
La historia se construye con recuerdos, objetos, documentos, lugares y testimonios. Ninguna voz individual debe ser automáticamente la verdad absoluta.

### 6. Ley de aprendizaje
El objetivo no es completar una lista de datos: es comprender cómo una comunidad se relaciona con su territorio, su producción, sus caminos, su agua, sus familias y sus transformaciones.

### 7. Ley de observación
El jugador puede aprender sin una misión activa. El paisaje, edificios, herramientas, caminos y cambios ambientales pueden contener información.

### 8. Ley de personas
Los habitantes tienen rutinas, necesidades, vínculos y memoria. No son simples carteles que entregan misiones.

### 9. Ley de economía
Los recursos tienen límites. El dinero, el trabajo, el transporte y los bienes deben tener valor práctico y consecuencias.

### 10. Ley de supervivencia cotidiana
Comer, descansar, trabajar, trasladarse, conversar y aprender forman parte de la vida. La simulación debe premiar la planificación, no la velocidad.

### 11. Ley de incertidumbre
El jugador puede interpretar mal un dato. Investigar más de una fuente aumenta la certeza.

### 12. Ley de respeto histórico
Cuando el juego se inspire en historia real, debe diferenciar claramente entre dato documentado, interpretación y ficción narrativa.

### 13. Ley de descubrimiento
La información importante no siempre aparece delante del jugador. Algunas historias se encuentran siguiendo personas, caminos, objetos o lugares.

### 14. Ley de persistencia
Los cambios relevantes deben permanecer: relaciones, decisiones, conocimiento adquirido, objetos encontrados y etapas de determinadas historias.

### 15. Ley de accesibilidad
Las reglas esenciales deben poder entenderse jugando. El sistema debe enseñar mediante consecuencias antes que mediante manuales largos.

### 16. Ley de mundo vivo
El jugador no es el centro del universo. Los habitantes trabajan, se desplazan, descansan y toman decisiones aunque Luna no esté presente.

### 17. Ley de geografía significativa
Cada zona debe justificar su existencia. Las chacras hablan de producción; el río, de agua y territorio; las bardas, de relieve; Picada 21, de distancia, aislamiento y vínculos.

### 18. Ley de continuidad
No crear múltiples motores paralelos ni versiones superpuestas del mismo sistema. El juego debe tener un único estado mundial y una única fuente de verdad.

### 19. Ley de pixel art
La representación visual debe ser legible, consistente y funcional. El pixel art no es decoración: comunica escala, orientación, objetos y época.

### 20. Ley de aprendizaje con Luna
Luna es compañera de investigación. No sabe todo. Aprende, pregunta, recuerda, compara y puede cambiar de opinión. El jugador aprende junto a ella.

## Dirección educativa

La referencia real a San Patricio del Chañar permite trabajar temas como:

- poblamiento y crecimiento de una comunidad;
- producción agrícola y relación con el agua;
- caminos, picadas y distancias;
- familias y memoria oral;
- transformación del paisaje;
- trabajo rural y vida cotidiana;
- instituciones y espacios comunitarios;
- cambios tecnológicos y económicos;
- relación entre pasado y presente.

Los contenidos históricos concretos se incorporarán mediante investigación y fuentes verificables, separados de la ficción de Villa Pelón.

## Arquitectura V2

La primera versión se mantiene deliberadamente simple: `index.html` + `style.css` + `src/main.js`, sin dependencias externas ni múltiples runtimes. La prioridad es consolidar el mundo y sus leyes antes de agregar contenido masivo.