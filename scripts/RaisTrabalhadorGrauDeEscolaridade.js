db.getCollection("RAIS_2021").aggregate([

    {
      $match: {
        "col_vinculo_ativo_31_12": 1
      }
    },
    {
      $group: {
        _id: {
          estado: "$col_uf",
          ocupacao: "$col_cbo_2002",
          formacao: "col_escolaridade_2005"
        },
        count: { $sum: 1 },
      }
    },
    {
      $project: {
        _id: 0,
        estado_sigla: "$_id.estado",
        ocupacao_cod: "$_id.ocupacao",
        formacao_id: "$_id.formacao",
        count: 1,
      }
    },
    {
      $out: "RaisTrabalhadorGrauDeEscolaridade"
    }
  ],    { allowDiskUse: true } )
  
  