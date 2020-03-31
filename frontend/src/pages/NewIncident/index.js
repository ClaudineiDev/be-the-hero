import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css'
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

// import heroesImg from '../../assets/heroes.png';
export default function NewIncidente(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function hadleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch (err) {
            
        }
    } 
    return (
        <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be the hero"/>

                        <h1>Cadastro novo caso</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041"/>
                                Voltar para home
                        </Link>
                    </section>

                    <form onSubmit={hadleNewIncident} >
                        <input 
                            placeholder="Titulo do caso"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea 
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <input 
                            placeholder="Valor em reais"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                 
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
    );
}