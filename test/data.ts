
const pokemons = [
    {
        "name": "stench",
        "url": "https://pokeapi.co/api/v2/ability/1/"
    },
    {
        "name": "drizzle",
        "url": "https://pokeapi.co/api/v2/ability/2/"
    },
    {
        "name": "speed-boost",
        "url": "https://pokeapi.co/api/v2/ability/3/"
    }
]

const pokemon = {
    "name": "raticate",
    "types": [
        {
            "slot": 1,
            "type": {
                "name": "normal",
                "url": "https://pokeapi.co/api/v2/type/1/"
            }
        }
    ]
}

const pokemonWithTypesAndTranslations = {
    "name": "raticate",
    "types": [
        {
            "slot": 1,
            "type": {
                "name": "normal",
                "url": "https://pokeapi.co/api/v2/type/1/"
            },
            "names": [
                {
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "name": "Normal"
                },
                {
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "name": "ノーマル"
                }
            ]
        }
    ]
}

const names = [
    {
        "language": {
            "name": "es",
            "url": "https://pokeapi.co/api/v2/language/7/"
        },
        "name": "Normal"
    },
    {
        "language": {
            "name": "ja",
            "url": "https://pokeapi.co/api/v2/language/11/"
        },
        "name": "ノーマル"
    }
]

export {pokemon, pokemonWithTypesAndTranslations, pokemons, names}