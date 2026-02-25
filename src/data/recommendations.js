export const compatibilityMap = {
    // Si compra Arduino (ID 1), sugerir Sensor (2) y Cautín (4)
    1: [2, 5],
    // Si compra Sensor (ID 2), sugerir Arduino (1) y Pantalla (5)
    2: [1, 5],
    // Si compra Pantalla (ID 5), sugerir Arduino (1)
    5: [1],
};