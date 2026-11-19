/*

 *  Botão Simulator 
 *  Aplicativo React Native de um único botão.
 *  O botão vermelho é uma imagem: a cada clique ele CRESCE,
 *  o contador aumenta e uma reação aleatória aparece na tela.
 
*/

import { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Imagem do botão (salve o arquivo em assets/botao.png na raiz do projeto).
// Caminho relativo a partir de src/app/index.js
const IMAGEM_BOTAO = require('../../assets/botao.png');

// Função auxiliar: monta a URL de uma imagem (ícone) a partir do código
const icone = (codigo) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/${codigo}.png`;

// Array com 7 elementos (mínimo exigido: 7).
// Cada elemento é uma reação com frase e imagem, sorteada a cada clique.
const REACOES = [
  { frase: 'Uau, que clique!', imagem: icone('1f680') },
  { frase: 'Brilhando!', imagem: icone('1f48e') },
  { frase: 'Pegando fogo!', imagem: icone('1f525') },
  { frase: 'Você é uma estrela!', imagem: icone('2b50') },
  { frase: 'Rápido como um raio!', imagem: icone('26a1') },
  { frase: 'Clique denovo!', imagem: icone('1f308') },
  { frase: 'Rei dos cliques!', imagem: icone('1f451') },
];

// Configurações de tamanho do botão
const TAMANHO_INICIAL = 130; // tamanho do botão no começo
const CRESCIMENTO = 8; // quanto o botão cresce a cada clique
const TAMANHO_MAXIMO = 500; // limite para o botão não ultrapassar a tela

// Classe principal do aplicativo (estende Component)
export default class App extends Component {
  // Constructor: inicializa o estado da aplicação
  constructor(props) {
    super(props);

    // this.state guarda as informações que serão atualizadas na tela
    this.state = {
      cliques: 0, // quantidade de cliques
      tamanho: TAMANHO_INICIAL, // tamanho atual do botão
      reacao: { frase: 'Aperte o botão!', imagem: icone('1f449') }, // reação exibida
    };

    // Garante que "this" funcione dentro da função do botão
    this.clicar = this.clicar.bind(this);
  }

  // Função principal: executada a cada clique no botão
  clicar() {
    // Math.random() gera um número entre 0 e 1;
    // multiplicamos pelo tamanho do array e usamos Math.floor()
    // para obter um índice inteiro válido (0 até REACOES.length - 1)
    const indice = Math.floor(Math.random() * REACOES.length);

    // Calcula o novo tamanho do botão, respeitando o limite máximo
    const novoTamanho = Math.min(this.state.tamanho + CRESCIMENTO, TAMANHO_MAXIMO);

    // this.setState() atualiza a tela: soma 1 clique, aumenta o botão
    // e troca a reação (frase + imagem) pelo elemento sorteado
    this.setState({
      cliques: this.state.cliques + 1,
      tamanho: novoTamanho,
      reacao: REACOES[indice],
    });
  }

  // Renderização da interface
  render() {
    const { cliques, tamanho, reacao } = this.state;

    return (
      <View style={estilos.container}>
        {/* Nome do aplicativo */}
        <Text style={estilos.titulo}>Botão Simulator    </Text> 
        <Text style={estilos.subtitulo}>Quanto mais você clica, maior ele fica!</Text>

        {/* Contador de cliques */}
        <Text style={estilos.rotulo}>CLIQUES</Text>
        <Text style={estilos.contador}>{cliques}</Text>

        {/* Reação sorteada: imagem e frase mudam a cada clique */}
        <View style={estilos.reacao}>
          <Image source={{ uri: reacao.imagem }} style={estilos.imagemReacao} />
          <Text style={estilos.fraseReacao}>{reacao.frase}</Text>
        </View>

        {/* Área do botão (altura fixa para o layout não pular quando ele cresce) */}
        <View style={estilos.areaBotao}>
          {/* Botão: a própria imagem é o botão. onPress executa a função principal. */}
          <TouchableOpacity activeOpacity={0.8} onPress={this.clicar}>
            <Image
              source={IMAGEM_BOTAO}
              style={{ width: tamanho, height: tamanho }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Estilização com StyleSheet.create()
// Identidade visual: fundo azul-noite com botão vermelho em destaque
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121826',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 15,
    color: '#9FB0CC',
    marginBottom: 20,
    textAlign: 'center',
  },
  rotulo: {
    fontSize: 14,
    color: '#9FB0CC',
    letterSpacing: 4,
  },
  contador: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagemReacao: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  fraseReacao: {
    fontSize: 16,
    color: '#9FB0CC',
  },
  areaBotao: {
    height: TAMANHO_MAXIMO + 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});