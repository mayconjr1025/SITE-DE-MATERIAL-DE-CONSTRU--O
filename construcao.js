// Evento DOMContentLoaded para garantir que o código seja executado após o carregamento completo da página
document.addEventListener("DOMContentLoaded", function() {
  console.log("A página foi totalmente carregada!"); // Log para indicar que a página foi carregada

  // Alterar o texto do banner promocional
  const promoBanner = document.querySelector('.banner-promocional p');
  if (promoBanner) {
    promoBanner.textContent = "Aproveite nossos descontos incríveis!";
  }

  // Adicionar evento de clique aos botões "Ver Detalhes"
  const botoesDetalhes = document.querySelectorAll('.btn');
  botoesDetalhes.forEach(botao => {
    botao.addEventListener('click', function() {
      alert('Verificando detalhes do produto...');
    });
  });

  // Adicionar animação ao logo ao passar o mouse
  const logo = document.querySelector('.logo-img');
  if (logo) {
    logo.addEventListener('mouseover', function() {
      this.style.transition = 'transform 0.3s ease-in-out';
      this.style.transform = 'scale(1.1)';
    });
    logo.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
  }

  // Adicionar sombra aos produtos ao passar o mouse
  const produtos = document.querySelectorAll('.product-card');
  produtos.forEach(produto => {
    produto.addEventListener('mouseover', function() {
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
    produto.addEventListener('mouseout', function() {
      this.style.boxShadow = 'none';
    });
  });

  // Exemplo de adicionar produto ao carrinho
  botoesDetalhes.forEach(botao => {
    botao.addEventListener('click', function() {
      const produtoNome = this.previousElementSibling.textContent;
      console.log(`Adicionando ${produtoNome} ao carrinho...`);
    });
  });
});

// Evento DOMContentLoaded para configuração do slider de imagens
document.addEventListener("DOMContentLoaded", function() {
  const sliderImages = document.querySelector('.slider-images');
  const slides = Array.from(sliderImages.children);

  // Função para duplicar slides e criar efeito contínuo
  function duplicateSlides() {
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      sliderImages.appendChild(clone);
    });
  }

  duplicateSlides();
});

// Evento DOMContentLoaded para funcionalidade de produtos
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById('search-input');
  const filterForm = document.querySelector('.filters form');
  const productCards = document.querySelectorAll('.product-card');

  // Função para filtrar produtos com base no termo de busca
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    productCards.forEach(card => {
      const productName = card.querySelector('p').textContent.toLowerCase();
      // Verifica se o nome do produto inclui o termo de busca
      card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
    });
  }

  // Filtrar produtos ao digitar na barra de busca
  searchInput.addEventListener('input', filterProducts);

  // Função para aplicar filtros de categoria e preço
  function applyFilters(event) {
    event.preventDefault();
    const category = filterForm.querySelector('#categoria').value;
    const priceRange = filterForm.querySelector('#preco').value;
    
    productCards.forEach(card => {
      const productCategory = card.dataset.category;
      const productPrice = parseFloat(card.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));

      // Verifica se o produto corresponde aos filtros de categoria e preço
      const categoryMatch = category === 'todas' || productCategory === category;
      const priceMatch = 
        priceRange === 'todas' ||
        (priceRange === 'baixo' && productPrice <= 50) ||
        (priceRange === 'medio' && productPrice > 50 && productPrice <= 100) ||
        (priceRange === 'alto' && productPrice > 100);

      card.style.display = categoryMatch && priceMatch ? 'block' : 'none';
    });
  }

  // Aplicar filtros ao enviar o formulário de filtros
  filterForm.addEventListener('submit', applyFilters);
});



//ORÇAMENTO
document.addEventListener("DOMContentLoaded", function() {
  // Calcular valor das parcelas
  const parcelas = document.getElementById('parcelas');
  const parcelamento = document.getElementById('parcelamento');
  const valoresProdutos = [20, 10, 50]; // Valores de exemplo dos produtos
  
  parcelas.addEventListener('change', function() {
    const numeroParcelas = parseInt(parcelas.value);
    const valorTotal = valoresProdutos.reduce((total, valor) => total + valor, 0);
    const valorParcela = (valorTotal / numeroParcelas).toFixed(2);
    parcelamento.textContent = `Valor da Parcela: R$${valorParcela}`;
  });

  // Adicionar mais produtos
  const addProduto = document.getElementById('add-produto');
  addProduto.addEventListener('click', function() {
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('produto');
    novaDiv.innerHTML = `
      <label for="produto">Selecione um Produto:</label>
      <select name="produto[]" aria-label="Selecione um produto" aria-required="true">
        <option value="" disabled selected>Escolha um produto...</option>
        <option value="Trena">Trena</option>
        <option value="Assento Sanitário">Assento Sanitário</option>
        <option value="Tinta de Revestimento">Tinta de Revestimento</option>
      </select>
      <label for="quantidade">Quantidade:</label>
      <input type="number" name="quantidade[]" min="1" required>
    `;
    document.querySelector('.form-orcamento').insertBefore(novaDiv, addProduto);
  });

  // Inicializar o mapa
  window.initMap = function() {
    const mapOptions = {
      zoom: 8,
      center: { lat: -15.7942, lng: -47.8822 }
    };
    const map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
  };
  
  // Mostrar o mapa quando solicitado
  const verMapa = document.getElementById('ver-mapa');
  verMapa.addEventListener('click', function() {
    document.getElementById('mapa').style.display = 'block';
    initMap();
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form-orcamento');
  
  form.addEventListener('submit', function(event) {
    const camposObrigatorios = form.querySelectorAll('[required]');
    let formValido = true;
    
    camposObrigatorios.forEach(campo => {
      if (!campo.value) {
        campo.classList.add('erro');
        formValido = false;
      } else {
        campo.classList.remove('erro');
      }
    });
    
    if (!formValido) {
      event.preventDefault();
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  });
});
//validação de email e telefone
form.addEventListener('submit', function(event) {
  const email = form.querySelector('#email');
  const telefone = form.querySelector('#telefone');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  
  if (!emailPattern.test(email.value)) {
    email.classList.add('erro');
    formValido = false;
  } else {
    email.classList.remove('erro');
  }
  
  if (!telefonePattern.test(telefone.value)) {
    telefone.classList.add('erro');
    formValido = false;
  } else {
    telefone.classList.remove('erro');
  }
});


// Função para calcular o valor das parcelas e adicionar produtos no orçamento
document.addEventListener("DOMContentLoaded", function() {
  // Calcular valor das parcelas
  const parcelas = document.getElementById('parcelas');
  const parcelamento = document.getElementById('parcelamento');
  const valoresProdutos = [20, 10, 50]; // Valores de exemplo dos produtos

  // Evento para calcular o valor da parcela quando o número de parcelas é alterado
  parcelas.addEventListener('change', function() {
    const numeroParcelas = parseInt(parcelas.value);
    const valorTotal = valoresProdutos.reduce((total, valor) => total + valor, 0);
    const valorParcela = (valorTotal / numeroParcelas).toFixed(2);
    parcelamento.textContent = `Valor da Parcela: R$${valorParcela}`;
  });

  // Adicionar novos produtos ao orçamento
  const addProduto = document.getElementById('add-produto');
  addProduto.addEventListener('click', function() {
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('produto');
    novaDiv.innerHTML = `
      <label for="produto">Selecione um Produto:</label>
      <select name="produto[]" aria-label="Selecione um produto" aria-required="true">
        <option value="" disabled selected>Escolha um produto...</option>
        <option value="Trena">Trena</option>
        <option value="Assento Sanitário">Assento Sanitário</option>
        <option value="Tinta de Revestimento">Tinta de Revestimento</option>
      </select>
      <label for="quantidade">Quantidade:</label>
      <input type="number" name="quantidade[]" min="1" required>
    `;
    document.querySelector('.form-orcamento').insertBefore(novaDiv, addProduto);
  });

  // Inicializar o mapa
  window.initMap = function() {
    const mapOptions = {
      zoom: 8,
      center: { lat: -15.7942, lng: -47.8822 }
    };
    const map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
  };
  
  // Mostrar o mapa quando solicitado
  const verMapa = document.getElementById('ver-mapa');
  verMapa.addEventListener('click', function() {
    document.getElementById('mapa').style.display = 'block';
    initMap();
  });
});

// Função para validar o formulário de orçamento
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form-orcamento');
  
  form.addEventListener('submit', function(event) {
    const camposObrigatorios = form.querySelectorAll('[required]');
    let formValido = true;
    
    camposObrigatorios.forEach(campo => {
      if (!campo.value) {
        campo.classList.add('erro');
        formValido = false;
      } else {
        campo.classList.remove('erro');
      }
    });
    
    if (!formValido) {
      event.preventDefault();
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  });
});

// Função para validar email e telefone
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form-orcamento');
  
  form.addEventListener('submit', function(event) {
    const email = form.querySelector('#email');
    const telefone = form.querySelector('#telefone');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    let formValido = true;
    
    if (!emailPattern.test(email.value)) {
      email.classList.add('erro');
      formValido = false;
    } else {
      email.classList.remove('erro');
    }
    
    if (!telefonePattern.test(telefone.value)) {
      telefone.classList.add('erro');
      formValido = false;
    } else {
      telefone.classList.remove('erro');
    }
    
    if (!formValido) {
      event.preventDefault();
    }
  });
});

// Função para manipular formulário de contato
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form-contato form');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Validação básica dos campos do formulário
    const nome = form.querySelector('#nome').value.trim();
    const email = form.querySelector('#email').value.trim();
    const telefone = form.querySelector('#telefone').value.trim();
    const mensagem = form.querySelector('#mensagem').value.trim();
    
    if (nome && email && telefone && mensagem) {
      // Aqui você pode adicionar uma chamada AJAX para enviar o formulário sem recarregar a página
      
      // Exibe mensagem de sucesso
      mensagemSucesso.style.display = 'block';
      
      // Limpa o formulário
      form.reset();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  });
});

// Função para agendar ligação e voltar ao topo
document.addEventListener("DOMContentLoaded", function() {
  // Agendar Ligação
  const agendarLigacaoBtn = document.getElementById('agendar-ligacao');
  agendarLigacaoBtn.addEventListener('click', function() {
    alert('Por favor, entre em contato através do telefone ou e-mail para agendar uma ligação.');
  });

  // Botão de voltar ao topo
  const voltarTopoBtn = document.getElementById('voltar-topo');
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
      voltarTopoBtn.style.display = 'block';
    } else {
      voltarTopoBtn.style.display = 'none';
    }
  });

  voltarTopoBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});



// Funções para manipular o carrinho de compras
document.addEventListener("DOMContentLoaded", function() {
  // Elementos do carrinho
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Função para atualizar o total do carrinho
  function updateTotal() {
    let total = 0;
    // Percorre cada linha do carrinho e calcula o total
    cartItems.querySelectorAll('tr').forEach(row => {
      const quantity = parseInt(row.querySelector('input').value); // Quantidade do produto
      const unitPrice = parseFloat(row.querySelector('.unit-price').textContent.replace('R$', '').replace(',', '.')); // Preço unitário do produto
      const totalPrice = unitPrice * quantity; // Calcula o preço total do produto
      row.querySelector('.total-price').textContent = `R$${totalPrice.toFixed(2).replace('.', ',')}`; // Atualiza o preço total no carrinho
      total += totalPrice; // Adiciona ao total do carrinho
    });
    cartTotal.textContent = `R$${total.toFixed(2).replace('.', ',')}`; // Atualiza o total do carrinho
  }

  // Eventos para incrementar, decrementar e remover itens do carrinho
  cartItems.addEventListener('click', function(event) {
    if (event.target.classList.contains('aumentar')) {
      const input = event.target.previousElementSibling; // Input de quantidade
      input.value = parseInt(input.value) + 1; // Incrementa a quantidade
      updateTotal(); // Atualiza o total do carrinho
    } else if (event.target.classList.contains('diminuir')) {
      const input = event.target.nextElementSibling; // Input de quantidade
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1; // Decrementa a quantidade se maior que 1
        updateTotal(); // Atualiza o total do carrinho
      }
    } else if (event.target.classList.contains('remover')) {
      event.target.closest('tr').remove(); // Remove o item do carrinho
      updateTotal(); // Atualiza o total do carrinho
    }
  });

  // Aplicar desconto com cupom
  document.getElementById('aplicar-cupom').addEventListener('click', function() {
    const desconto = 10; // Valor de desconto fictício
    const totalComDesconto = (parseFloat(cartTotal.textContent.replace('R$', '').replace(',', '.')) - desconto).toFixed(2).replace('.', ',');
    cartTotal.textContent = `R$${totalComDesconto}`; // Atualiza o total com o desconto
    document.querySelector('.desconto').textContent = `Desconto: R$${desconto.toFixed(2).replace('.', ',')}`; // Mostra o valor do desconto
  });
});

// Função para mostrar o botão de voltar ao topo na página Sobre
document.addEventListener("DOMContentLoaded", function() {
  const btnTopo = document.getElementById("voltar-topo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTopo.style.display = "block"; // Mostra o botão se a rolagem for maior que 300px
    } else {
      btnTopo.style.display = "none"; // Esconde o botão se a rolagem for menor que 300px
    }
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rola suavemente até o topo da página
  });
});

// Função para mostrar o botão de voltar ao topo na página Termos de Uso
document.addEventListener("DOMContentLoaded", function() {
  const botaoTopo = document.getElementById('voltar-topo');

  window.onscroll = () => {
    if (window.scrollY > 300) {
        botaoTopo.style.display = 'block'; // Mostra o botão se a rolagem for maior que 300px
    } else {
        botaoTopo.style.display = 'none'; // Esconde o botão se a rolagem for menor que 300px
    }
  };

  botaoTopo.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola suavemente até o topo da página
  };
});

