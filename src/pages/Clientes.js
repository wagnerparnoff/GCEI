import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import './style.css';

export default function Clientes() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idade, setIdade] = useState('');
    const [profissao, setProfissao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCEP] = useState('');
    const [storage, setStorage] = useState([]);
    const [show, setShow] = useState(false);
    const [remover, setRemover] = useState();

    useEffect(() => {
        const clientes = JSON.parse(localStorage.getItem('clientes'));
        if (clientes && clientes.length > 0) {
            setStorage(clientes);
        }
    }, []);

    function clearFields() {
        setNome('');
        setEmail('');
        setTelefone('');
        setIdade('');
        setProfissao('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setCEP('');
    }

    function handleSubmit(e) {

        e.preventDefault();
        
        const cliente = {
            id: storage.length + 1,
            nome,
            email,
            telefone,
            idade,
            profissao,
            endereco: [endereco, bairro, cidade, cep.toString()].join(' - ')
        };

        const novoClientes = [...storage, cliente];

        localStorage.setItem('clientes', JSON.stringify(novoClientes));

        setStorage(novoClientes);

        clearFields();

        toast.dark('Cliente cadastrado com sucesso!', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    }

    function removerCliente(id) {
        const novoClientes = storage.filter((cliente) => cliente.id !== id);
        localStorage.setItem('clientes', JSON.stringify(novoClientes));
        setStorage(novoClientes);
        setShow(false);
    }


    return (
        <div className="container">
            <h1>Clientes</h1>
            <div className="form-container">
                <form>
                    <label>
                        Nome:<input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                    </label>
                    <label>
                        Email:<input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        Telefone:<input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} required />
                    </label>
                    <label>
                        Idade:<input type="number" value={idade} onChange={e => setIdade(e.target.value)} required />
                    </label>
                    <label>
                        Profissão:<input type="text" value={profissao} onChange={e => setProfissao(e.target.value)} required />
                    </label>
                </form>
                <form onSubmit={handleSubmit}>
                    <label>
                        Endereço:<input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} required />
                    </label>
                    <label>
                        Bairro:<input type="text" value={bairro} onChange={e => setBairro(e.target.value)} required />
                    </label>
                    <label>
                        Cidade:<input type="text" value={cidade} onChange={e => setCidade(e.target.value)} required />
                    </label>
                    <label>
                        CEP:<input type="number" value={cep} onChange={e => setCEP(e.target.value)} required />
                    </label>
                    <input type="submit" value='Cadastrar'/>
                </form>
            </div>
            <div className="client-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Idade</th>
                            <th>Profissão</th>
                            <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storage.map((cliente, i) => (
                            <tr id={cliente.id} key={i} onClick={() => {
                                setRemover(cliente.id);
                                setShow(true);
                            }}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.idade}</td>
                                <td>{cliente.profissao}</td>
                                <td>{cliente.endereco}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal desc='Deseja excluir o cliente cadastrado?' show={show} onClose={e => setShow(false)} onSubmit={e => removerCliente(remover)} />
        </div>
    );
}