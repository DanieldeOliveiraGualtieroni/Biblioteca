// Seletores dos elementos HTML
const bookForm = document.getElementById('book-form');
const bookTable = document.getElementById('book-table').getElementsByTagName('tbody')[0];

// Array de livros (dados em memória)
let books = [];

// Função para gerar um ID único para cada livro
function generateId() {
    return books.length > 0 ? books[books.length - 1].id + 1 : 1;
}

// Função para renderizar os livros na tabela
function renderBooks() {
    bookTable.innerHTML = ''; // Limpa a tabela antes de re-renderizar
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.author}</td>
            <td>${book.title}</td>
            <td>${book.genre}</td>
            <td>${book.quantity}</td>
            <td>
                <button onclick="editBook(${book.id})">Editar</button>
                <button onclick="deleteBook(${book.id})">Excluir</button>
            </td>
        `;
        bookTable.appendChild(row);
    });
}

// Função para adicionar um novo livro
bookForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Obtenção dos valores do formulário
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const genre = document.getElementById('book-genre').value;
    const quantity = parseInt(document.getElementById('book-quantity').value);

    // Criando o novo livro
    const newBook = {
        id: generateId(),
        title: title,
        author: author,
        genre: genre,
        quantity: quantity
    };

    // Adicionando o novo livro ao array
    books.push(newBook);
    
    // Atualizando a tabela
    renderBooks();

    // Limpando os campos do formulário
    bookForm.reset();
});

// Função para editar um livro
function editBook(id) {
    // Encontrar o livro que será editado
    const book = books.find(book => book.id === id);

    if (book) {
        // Preencher o formulário com os dados do livro
        document.getElementById('book-title').value = book.title;
        document.getElementById('book-author').value = book.author;
        document.getElementById('book-genre').value = book.genre;
        document.getElementById('book-quantity').value = book.quantity;

        // Alterar a ação do botão de "Adicionar Livro" para "Salvar Edição"
        bookForm.removeEventListener('submit', handleAddBook);
        bookForm.addEventListener('submit', function handleEditBook(event) {
            event.preventDefault();

            book.title = document.getElementById('book-title').value;
            book.author = document.getElementById('book-author').value;
            book.genre = document.getElementById('book-genre').value;
            book.quantity = parseInt(document.getElementById('book-quantity').value);

            renderBooks(); // Atualizar a tabela

            // Limpar o formulário e voltar ao estado de "Adicionar Livro"
            bookForm.reset();
            bookForm.removeEventListener('submit', handleEditBook);
            bookForm.addEventListener('submit', handleAddBook);
        });
    }
}

// Função para excluir um livro
function deleteBook(id) {
    // Confirmar a exclusão
    const confirmDelete = confirm('Você tem certeza que deseja excluir este livro?');

    if (confirmDelete) {
        // Remover o livro do array
        books = books.filter(book => book.id !== id);

        // Atualizar a tabela
        renderBooks();
}

// Função para adicionar um livro (que era originalmente no evento de submit)
function handleAddBook(event) {
    event.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const genre = document.getElementById('book-genre').value;
    const quantity = parseInt(document.getElementById('book-quantity').value);

    const newBook = {
        id: generateId(),
        title: title,
        author: author,
        genre: genre,
        quantity: quantity
    };

    books.push(newBook);

    renderBooks(); // Atualizar a tabela

    bookForm.reset();
}
}