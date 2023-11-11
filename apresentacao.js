const formatarMoeda = require("./util.js");

module.exports = function gerarFaturaStr(fatura, servicoCalculo) {
  let totalFatura = 0;
  let creditos = 0;
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    const total = servicoCalculo.calcularTotalApresentacao(apre);
    const creditosApre = servicoCalculo.calcularCredito(apre);

    creditos += creditosApre;

    faturaStr += `  ${servicoCalculo.repo.getPeca(apre).nome}: ${formatarMoeda(total)} (${apre.audiencia} assentos)\n`;
    totalFatura += total;
  }

  faturaStr += `Valor total: ${formatarMoeda(servicoCalculo.calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${servicoCalculo.calcularTotalCreditos(fatura.apresentacoes)} \n`;

  return faturaStr;
}
