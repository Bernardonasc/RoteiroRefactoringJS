function calcularValoresFatura(fatura, pecas) {
  const valores = [];
  for (const apre of fatura.apresentacoes) {
    const peca = pecas[apre.id];
    const total = calcularValorApresentacao(peca, apre.audiencia);
    valores.push({
      peca: peca.nome,
      valor: total,
      audiencia: apre.audiencia
    });
  }
  return valores;
}

function calcularValorApresentacao(peca, audiencia) {
  let valor = 0;
  switch (peca.tipo) {
    case "tragedia":
      valor = 40000;
      if (audiencia > 30) {
        valor += 1000 * (audiencia - 30);
      }
      break;
    case "comedia":
      valor = 30000;
      if (audiencia > 20) {
        valor += 10000 + 500 * (audiencia - 20);
      }
      valor += 300 * audiencia;
      break;
    default:
      throw new Error(`Peça desconhecia: ${peca.tipo}`);
  }
  return valor;
}

function formatarFatura(valores) {
  const faturaStr = `Fatura ${fatura.cliente}\n`;
  for (const valor of valores) {
    faturaStr += `  ${valor.peca}: ${valor.valor} (${valor.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${valores.reduce((total, valor) => total + valor.valor, 0)}\n`;
  faturaStr += `Créditos acumulados: ${valores.reduce((total, valor) => total + Math.max(valor.audiencia - 30, 0) + Math.floor(valor.audiencia / 5), 0)}\n`;
  return faturaStr;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = formatarFatura(calcularValoresFatura(faturas, pecas));
console.log(faturaStr);
