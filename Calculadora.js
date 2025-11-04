// calculadora.js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

// ---- Funciones matemáticas ----
function sumar(a, b) { return a + b; }
function restar(a, b) { return a - b; }
function multiplicar(a, b) { return a * b; }
function dividir(a, b) { return (b === 0) ? "❌ Error: división por cero" : a / b; }
function modulo(a, b) { return (b === 0) ? "❌ Error: módulo por cero" : a % b; }
function potencia(a, b) { return Math.pow(a, b); }
function raizCuadrada(a) { return (a < 0) ? "❌ Error: raíz negativa" : Math.sqrt(a); }

function raizNesima(a, n) {
  if (n === 0) return "❌ Error: raíz de orden cero no válida";
  // Si n es entero y par, no permitimos raíz par de número negativo
  if (a < 0 && Number.isInteger(n) && n % 2 === 0) return "❌ Error: raíz par de número negativo";
  return Math.pow(a, 1 / n);
}

// ---- Formato de salida ----
function formatearResultado(valor) {
  if (typeof valor === 'string') return valor; // error textual
  if (typeof valor !== 'number' || Number.isNaN(valor)) return "❌ Error: resultado no es número válido";
  if (Number.isInteger(valor)) return valor;
  // Redondear a máximo 2 decimales (como en Python round)
  return Math.round(valor * 100) / 100;
}

// ---- Menú principal ----
function mostrarMenu() {
  console.log("\n=== Calculadora ===");
  console.log("1. Sumar");
  console.log("2. Restar");
  console.log("3. Multiplicar");
  console.log("4. Dividir");
  console.log("5. Módulo");
  console.log("6. Potencia");
  console.log("7. Raíz cuadrada");
  console.log("8. Raíz n-ésima");
  console.log("9. Salir");
}

// ---- Lógica principal ----
async function calculadora() {
  while (true) {
    mostrarMenu();
    let opcion = (await question("Seleccione una opción (1-9): ")).trim();

    let resultado;

    switch (opcion) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
        try {
          let aStr = await question("Ingrese el primer número: ");
          let bStr = await question("Ingrese el segundo número: ");
          let a = parseFloat(aStr.replace(',', '.'));
          let b = parseFloat(bStr.replace(',', '.'));
          if (Number.isNaN(a) || Number.isNaN(b)) {
            console.log("❌ Error: entrada no válida.");
            continue;
          }

          switch (opcion) {
            case '1': resultado = sumar(a, b); break;
            case '2': resultado = restar(a, b); break;
            case '3': resultado = multiplicar(a, b); break;
            case '4': resultado = dividir(a, b); break;
            case '5': resultado = modulo(a, b); break;
            case '6': resultado = potencia(a, b); break;
          }
        } catch (e) {
          console.log("❌ Error inesperado en la entrada.");
          continue;
        }
        break;

      case '7':
        try {
          let aStr = await question("Ingrese el número: ");
          let a = parseFloat(aStr.replace(',', '.'));
          if (Number.isNaN(a)) {
            resultado = "❌ Error: entrada no válida.";
          } else {
            resultado = raizCuadrada(a);
          }
        } catch (e) {
          resultado = "❌ Error: entrada no válida.";
        }
        break;

      case '8':
        try {
          let aStr = await question("Ingrese el número: ");
          let nStr = await question("Ingrese el valor de n (orden de la raíz): ");
          let a = parseFloat(aStr.replace(',', '.'));
          let n = parseFloat(nStr.replace(',', '.'));
          if (Number.isNaN(a) || Number.isNaN(n)) {
            resultado = "❌ Error: entrada no válida.";
          } else {
            resultado = raizNesima(a, n);
          }
        } catch (e) {
          resultado = "❌ Error: entrada no válida.";
        }
        break;

      case '9':
        console.log("👋 ¡Gracias por usar la Calculadora PRO! Hasta luego.");
        rl.close();
        return;

      default:
        console.log("⚠️ Opción no válida. Intente nuevamente.");
        continue;
    }

    console.log(`✅ Resultado: ${formatearResultado(resultado)}`);
  }
}

// ---- Punto de entrada ----
calculadora();
