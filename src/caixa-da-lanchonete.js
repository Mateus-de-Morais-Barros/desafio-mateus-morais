class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const cardapio = [
      ["cafe", 3.0],
      ["chantily", 1.5],
      ["suco", 6.2],
      ["sanduiche", 6.5],
      ["queijo", 2.0],
      ["salgado", 7.25],
      ["combo1", 9.5],
      ["combo2", 7.5],
    ];

    const dependencias = [
      ["chantily", "cafe"],
      ["queijo", "sanduiche"],
    ];

    function checa_dependencia(itens, dependencias) {
      const code = [];
      for (let i = 0; i < itens.length; i++) {
        code.push(itens[i][0]);
      }

      for (let i = 0; i < dependencias.length; i++) {
        let d_code = dependencias[i][0];

        if (code.includes(d_code)) {
          if (code.includes(d_code) && code.includes(dependencias[i][1]))
            continue;
          else return false;
        }
      }
      return true;
    }

    function split_array(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(",");
        arr[i][1] = parseInt(arr[i][1]);
      }
    }

    function merge_price(itens, cardapio) {
      for (let i = 0; i < itens.length; i++) {
        for (let j = 0; j < cardapio.length; j++) {
          if (cardapio[j][0] == itens[i][0]) {
            itens[i].push(cardapio[j][1]);
          }
        }
      }
    }

    split_array(itens); //  itens = [["cafe",1]]
    merge_price(itens, cardapio); // itens = [["cafe",1,3],["suco",2,6.2]]

    function checa_cardapio(itens, cardapio) {
      let presente = false;
      for (let i = 0; i < itens.length; i++) {
        let item = itens[i][0];
        presente = false;
        for (let j = 0; j < cardapio.length; j++) {
          if (item == cardapio[j][0]) {
            presente = true;
          } else {
            continue;
          }
        }

        if (presente == false) {
          return false;
        } else if (presente == true) {
          continue;
        }
      }
    }
    //formas de pagamento
    let preco = 0;
    let dinheiro_desconto = 5 / 100,
      credito_acrescimo = 3 / 100;

    function paga_dinheiro(itens) {
      if (checa_dependencia(itens, dependencias) == false) {
        return "Item extra não pode ser pedido sem o principal";
      }
      if (checa_cardapio(itens, cardapio) == false) {
        return "Item inválido!";
      }
      for (let i = 0; i < itens.length; i++) {
        if (itens[i][1] == 0) {
          return "Quantidade inválida!";
        }
        preco += itens[i][1] * itens[i][2];
      }
      preco = preco - preco * dinheiro_desconto;
      preco = preco.toFixed(2);
      return `R$ ${preco}`.replace(".", ",");
    }

    function paga_credito(itens) {
      if (checa_dependencia(itens, dependencias) == false) {
        return "Item extra não pode ser pedido sem o principal";
      }
      if (checa_cardapio(itens, cardapio) == false) {
        return "Item inválido!";
      }
      for (let i = 0; i < itens.length; i++) {
        //if (itens[i][1] =1) {
        //return 'Item inválido!'
        //}
        preco += itens[i][1] * itens[i][2];
      }
      preco = preco + preco * credito_acrescimo;
      preco = preco.toFixed(2);
      return `R$ ${preco}`.replace(".", ",");
    }

    function paga_debito(itens) {
      if (checa_dependencia(itens, dependencias) == false) {
        return "Item extra não pode ser pedido sem o principal";
      }
      if (checa_cardapio(itens, cardapio) == false) {
        return "Item inválido!";
      }
      for (let i = 0; i < itens.length; i++) {
        preco += itens[i][1] * itens[i][2];
      }
      preco = preco.toFixed(2);
      return `R$ ${preco}`.replace(".", ",");
    }

    // validações
    if (!itens[0]) {
      return "Não há itens no carrinho de compra!";
    } else if (metodoDePagamento == "dinheiro") {
      const dinheiro = paga_dinheiro(itens);
      return dinheiro;
    } else if (metodoDePagamento == "credito") {
      const credito = paga_credito(itens);
      return credito;
    } else if (metodoDePagamento == "debito") {
      const debito = paga_debito(itens);
      return debito;
    } else return "Forma de pagamento inválida!";
  }
}

export { CaixaDaLanchonete };
