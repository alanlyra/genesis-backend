const mongoose = require('mongoose');
const collectionMapping = require('../collection_mapping/Empresas')

const EmpresasSchema = new mongoose.Schema({
  CNPJ_Basico: {
    type: Number
  },
  Capital_Social_Empresa: {
    type: String
  },
  Natureza_Juridica: {
    type: Number
  },
  Porte_Empresa: {
    type: Number
  },
  Qualificacao_Responsavel: {
    type: Number
  },
  Razao_Social: {
    type: String
  }
});

const Empresas = mongoose.model('Empresas', EmpresasSchema, collectionMapping);

module.exports = Empresas;