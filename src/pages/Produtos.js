import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import './style.css';

export default function Clientes() {

    
    const [sku, setSKU] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [valor, setValor] = useState('');
    const [qntd, setQntd] = useState('');
    const [storage, setStorage] = useState([]);
    const [show, setShow] = useState(false);
    const [remover, setRemover] = useState();

    useEffect(() => {
        const produtos = JSON.parse(localStorage.getItem('produtos'));
        if (produtos && produtos.length > 0) {
            setStorage(produtos);
        }
    }, []);

    const currencyFormatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'BRL'
      })

    const amountFormatter = new Intl.NumberFormat([], {
    style: 'decimal',
    currency: 'BRL'
    })

    function clearFields() {
        setSKU('');
        setDescricao('');
        setCategoria('');
        setValor('');
        setQntd('');
    }

    function handleSubmit(e) {

        e.preventDefault();

        const produto = {
            id: storage.length + 1,
            sku,
            descricao,
            categoria,
            valor,
            qntd
        };

        const novoProdutos = [...storage, produto];

        localStorage.setItem('produtos', JSON.stringify(novoProdutos));

        setStorage(novoProdutos);

        clearFields();

        toast.dark('Produto cadastrado com sucesso!', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    function removerProduto(id) {
        const novoProdutos = storage.filter((produto) => produto.id !== id);
        localStorage.setItem('produtos', JSON.stringify(novoProdutos));
        setStorage(novoProdutos);
        setShow(false);
    }

    return (
        <div className="container">
            <h1>Produtos</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        SKU:<input type="text" value={sku} onChange={e => {setSKU(e.target.value)}} required />
                    </label>
                    <label>
                        Descrição:<input type="text" value={descricao} onChange={e => {setDescricao(e.target.value)}} required />
                    </label>
                    <label>
                        Categoria:<input type="text" value={categoria} onChange={e => {setCategoria(e.target.value)}} required />
                    </label>
                    <label>
                        Valor unitário:<input type="number" value={valor} onChange={e => {setValor(e.target.value)}} required />
                    </label>
                    <label>
                        Quantidade:<input type="number" min="1" pattern="\d+" value={qntd} onChange={e => {setQntd(e.target.value)}} required />
                    </label>
                    <input type="submit" value='Cadastrar'/>
                </form>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Valor Unitário</th>
                            <th>Quantidade</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storage.map((produto, i) => (
                                <tr id={produto.id} key={i} onClick={() => {
                                    setRemover(produto.id);
                                    setShow(true);
                                }}>
                                    <td>{produto.sku}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.categoria}</td>
                                    <td>{currencyFormatter.format(produto.valor)}</td>
                                    <td>{amountFormatter.format(produto.qntd)}</td>
                                    <td>{currencyFormatter.format(produto.valor*produto.qntd)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Modal desc='Deseja excluir o produto cadastrado?' show={show} onClose={e => setShow(false)} onSubmit={e => removerProduto(remover)} />
        </div>
    );
}