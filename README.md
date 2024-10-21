Documentação do Projeto de Loja Virtual
Visão Geral
Este projeto é uma aplicação de loja virtual desenvolvida em React. Ele utiliza um contexto para gerenciar o estado do carrinho de compras e as interações do usuário com os produtos.
Estrutura do Projeto
components/: Contém os componentes principais da aplicação.
context/: Contém a lógica do contexto de compras.
products.js: Um arquivo que exporta a lista de produtos disponíveis na loja.
Contexto de Compras (ShopContext)
Descrição
O ShopContext fornece um contexto global que permite gerenciar o estado do carrinho de compras e as interações do usuário. Ele inclui funcionalidades para adicionar, remover e atualizar itens no carrinho, bem como calcular o total de itens e o valor total do pedido.
Funções do Contexto
getDefaultCart()
Retorna um objeto que representa o estado inicial do carrinho, onde todos os itens estão com a quantidade igual a zero.
addToCart(itemId)
Adiciona um item ao carrinho, incrementando a quantidade do item especificado pelo itemId.
removeFromCart(itemId)
Remove um item do carrinho, decrementando a quantidade do item especificado pelo itemId.
updateCartItemCount(newAmount, itemId)
Atualiza a quantidade de um item no carrinho para um novo valor.
getTotalCartAmount()
Calcula e retorna o valor total do carrinho, multiplicando a quantidade de cada item pelo seu preço.
finalizeOrder()
Cria um novo pedido com base nos itens no carrinho, armazena o pedido no localStorage e reinicializa o carrinho.
getTotalItemsInCart()
Retorna a quantidade total de itens no carrinho.
filterProductsByCategory(category)
Filtra os produtos com base na categoria selecionada.
filteredProducts
Retorna a lista de produtos filtrados com base na categoria selecionada.
Componente Cart
Visão Geral
O componente Cart exibe os itens que o usuário adicionou ao carrinho, calcula o total do pedido e oferece opções para finalizar a compra ou retornar à página inicial. Ele utiliza o contexto de compras (ShopContext) para gerenciar o estado do carrinho.
Funcionalidades
1. Renderização de Itens do Carrinho
O componente itera sobre a lista de produtos (PRODUCTS) e verifica se a quantidade de cada produto no carrinho (cartItems) é maior que zero. Se for, ele renderiza o componente CartItem.
2. Cálculo do Total do Carrinho
O componente utiliza a função getTotalCartAmount do contexto para calcular o valor total dos itens no carrinho.
3. Finalização do Pedido
handleFinalizeOrder: Esta função é chamada quando o usuário clica no botão "Finalizar pedido". Ela exibe uma confirmação ao usuário e, se confirmada, finaliza o pedido através da função finalizeOrder do contexto e navega para a página de pedidos.
4. Navegação
O componente usa o hook useNavigate para permitir que o usuário retorne à página inicial ou navegue para a página de pedidos após finalizar a compra.
Propriedades
O componente Cart não recebe propriedades diretamente, pois obtém todos os dados necessários através do contexto.
Estilos
Os estilos do componente são importados do arquivo cart.module.css, que deve conter as classes necessárias para estilizar o layout do carrinho.
Componente CartItem
Visão Geral
O componente CartItem é responsável por exibir as informações de um único item no carrinho de compras, incluindo a imagem do produto, o nome, o preço e controles para ajustar a quantidade do item.
Funcionalidades
1. Exibição das Informações do Produto
O componente recebe as informações do produto através da propriedade data, que inclui:
id: Identificador único do produto.
productName: Nome do produto.
price: Preço do produto.
productImg: URL da imagem do produto.
Essas informações são exibidas na interface.
2. Controle da Quantidade do Produto
O componente permite que os usuários ajustem a quantidade de cada item no carrinho por meio de três elementos:
Botão de Remoção: Um botão que decrementa a quantidade do produto no carrinho. Chama a função removeFromCart do contexto.
Campo de Entrada: Um campo onde o usuário pode inserir a quantidade desejada do produto. O valor é gerenciado pelo estado do contexto, e qualquer alteração chama a função updateCartItemCount para atualizar a quantidade.
Botão de Adição: Um botão que incrementa a quantidade do produto no carrinho. Chama a função addToCart do contexto.
Propriedades
data: Um objeto que contém as informações do produto a ser exibido. Deve incluir id, productName, price e productImg.
Componente OrderFilter
Visão Geral
O componente OrderFilter permite que os usuários filtrem uma lista de pedidos com base em um termo de busca. Ele oferece um campo de entrada onde os usuários podem digitar o nome de um produto ou o ID do pedido, e a busca é atualizada em tempo real.
Funcionalidades
1. Armazenamento do Termo de Busca
O componente utiliza o useState para criar uma variável de estado chamada searchTerm, que armazena o valor atual do campo de entrada.
2. Manipulação de Mudanças no Input
handleChange: Função que é chamada sempre que o valor do campo de entrada muda. Ela:
Obtém o valor atual do input.
Atualiza o estado searchTerm com o novo valor.
Chama a função onFilterChange, que é passada como uma propriedade, para notificar os componentes pai sobre a mudança no termo de busca.
3. Renderização do Campo de Entrada
O componente renderiza um rótulo (label) e um campo de entrada (input) onde os usuários podem digitar seu termo de busca. O valor do input é controlado pelo estado searchTerm.
Componente Product
Visão Geral
O componente Product exibe as informações de um único produto, incluindo a imagem, o nome e o preço. Ele também permite que os usuários adicionem o produto ao carrinho de compras. O componente mostra a quantidade do produto que já foi adicionada ao carrinho, se houver.
Funcionalidades
1. Exibição das Informações do Produto
O componente recebe as informações do produto através da propriedade data, que inclui:
id: Identificador único do produto.
productName: Nome do produto.
price: Preço do produto.
productImg: URL da imagem do produto.
2. Adição ao Carrinho
addToCart: Função extraída do contexto que permite adicionar o produto ao carrinho. Quando o botão é clicado, a função addToCart é chamada com o id do produto.
3. Controle da Quantidade no Carrinho
O componente exibe a quantidade do produto que já foi adicionada ao carrinho. Se o produto já estiver no carrinho (cartItemAmount > 0), a quantidade é mostrada entre parênteses ao lado do texto "Adicionar ao carrinho".
4. Limitação do Nome do Produto
O nome do produto é exibido com um limite de 50 caracteres. Se o nome do produto exceder esse limite, o texto "..." é adicionado ao final para indicar que há mais texto.
Propriedades
Componente Shop
Visão Geral
O componente Shop é responsável por exibir uma lista de produtos disponíveis para compra, permitindo que os usuários filtrem produtos por categoria e naveguem entre as páginas. Ele interage com o contexto da loja para gerenciar o estado dos produtos filtrados e a página atual.
Funcionalidades
1. Filtro de Categorias
O componente exibe botões que permitem ao usuário filtrar produtos por categoria (como "Eletrônicos", "Moda", "Calçados", etc.). Quando um botão é clicado, a função handleCategoryChange é chamada, atualizando a categoria filtrada e resetando a página atual para 1.
2. Paginação
O componente implementa a paginação dos produtos exibidos. Com um limite definido de 6 produtos por página, ele calcula quais produtos exibir com base na página atual. Os controles de navegação permitem que o usuário avance ou retroceda pelas páginas.
3. Exibição de Produtos
Os produtos filtrados são mapeados e renderizados utilizando o componente Product. Apenas os produtos da página atual são exibidos.
4. Condicional de Paginação
A navegação da página é exibida apenas se houver mais de 6 produtos filtrados, evitando mostrar controles desnecessários quando há apenas uma página.
Estado
currentPage: Armazena a página atual que o usuário está visualizando.
Funções
handleCategoryChange
Parâmetros: category (string) - A categoria a ser aplicada como filtro.
Descrição: Atualiza a categoria filtrada no contexto e reseta a página atual para 1.
Cálculo de Índices
indexOfLastProduct: Calcula o índice do último produto a ser exibido na página atual.
indexOfFirstProduct: Calcula o índice do primeiro produto a ser exibido.
currentProducts: Array de produtos que devem ser exibidos na página atual.
totalPages: Número total de páginas, arredondado para cima.

