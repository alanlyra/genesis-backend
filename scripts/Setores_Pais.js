db.getCollection("RAIS_2021").aggregate([
    {
        $match: {
            "col_vinculo_ativo_31_12" : 1
        }
    },
    {
        $group: {
            _id: {
                ocupacao: "$col_cbo_2002",
                cnae2classe: "$cnae2classe",
                col_cnae_subclasse: "$col_cnae_subclasse"
            },
            ocupacao: {$first: "$col_cbo_2002"},
            cnae2classe: {$first: "$cnae2classe"},
            col_cnae_subclasse: {$first: "$col_cnae_subclasse"},
            count: { $sum: 1 } // Soma a quantidade de registros em cada grupo
        }
    },
    {
    $lookup: {
      from: "cnae_20",
      localField: "cnae2classe",
      foreignField: "Classe",
      as: "cnae_info"
    }
  },
  {
    $addFields: {
      classe: { $arrayElemAt: ["$cnae_info.Denominação", 0] }
    }
  },
    {
    $lookup: {
      from: "subclasse_cnae_20",
      localField: "col_cnae_subclasse",
      foreignField: "cod",
      as: "subclasse_cnae_info"
    }
  },
  {
    $addFields: {
      subclasse: { $arrayElemAt: ["$subclasse_cnae_info.desc", 0] }
    }
  },
  {
    $project: {
      _id: 1,
      ocupacao: 1,
      cnae2classe: 1,
      col_cnae_subclasse: 1,
      subclasse: 1,
      count: 1,
      classe: 1,
    }
  },
    {
        $group: {
            _id: {
                ocupacao: "$ocupacao",
                cnae2classe: "$cnae2classe"
            },
            estado: {$first: "$estado"},
            ocupacao: {$first: "$ocupacao"},
            cnae2classe: {$first: "$cnae2classe"},
            classe: {$first: "$classe"},
            "data": {
                $push: {
                    
                    col_cnae_subclasse: "$col_cnae_subclasse",
                    subclasse: "$subclasse",
                    count: "$count"
                }
            },
            total: { $sum: "$count" }
        }
    },
    {
        $out: "Setores_Pais"
    }
],    { allowDiskUse: true } )
