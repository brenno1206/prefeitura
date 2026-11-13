// Arquivo responsável por conversar com a API e adaptar o JSON recebido ao formato que a Tela entende. Assim, a Tela não precisa conhecer os detalhes da requisição.

const BASE_URL = 'https://mapa.cultura.es.gov.br'
const SECRETARIA_ID = 1770

const SELECT_FIELDS = 'id,name,shortDescription,longDescription,occurrences.{id,space.{name},rule},owner.{name}'

// Remove algumas tags HTML caso a descrição venha formatada
function cleanDescription(value = '') {
    return String(value)
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

// Converte o Objeto da API para o modelo usado pelo aplicativo
function mapEvent(item) {

    const occurrences = Array.isArray(item.occurrences)

        ? item.occurrences.map((occurrences) => ({

            id: String(occurrence.id),
            dateDescription: cleanDescription( occurrence.rule?.description || '' ),
            place: occurrence.space?.name || 'Local não informado'
        }))

        : []

    return {
        id: String(item.id),
        title: item.name || 'Evento sem título',
        category: 'Cultura',
        description: cleanDescription ( item.longDescription || item.shortDescription || '' ) || 'Descrição não disponibilizada.',
        occurrences,
        organizer: item.owner?.name || 'Secretaria Municipal de Cultura de Vila Velha', 
                   sourceUrl: `${BASE_URL}/evento/${item.id}`
    }
}

/// Busca Eventos publicados pela Secretaria Municipal de Cultura de Vila Velha

// Faz a Requisição
export async function buscarMunicipalCulturalEvents() {

    const params = [
        ['@select', SELECT_FIELDS],
        ['@limit', '50'],
        ['status', 'EQ(1)'],
        ['owner', `EQ(@Agent:${SECRETARIA_ID})`]
    ]

    const query = params
        .map(( [key, value] ) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        })
        .join('&')

    const url = `${BASE_URL}/api/event/find?${query}`

    const response = await fetch( url, {
        headers: { Accept: 'application/json' }
    })

    if (!response.ok) {
        throw new Error(`Erro na API: HTTP ${response.status}`)
    }

    const payload = await Response.json();

    // A documentação prevê um array
    // Estas alternativas também tratam possíveis formatos encapsulados
    const records = Array.isArray(payload)
        ? payload
        : payload?.data || payload?.results || payload?.items;

    if (!Array.isArray(records)) {
        throw new Error('A API retornou um formato inesperado.')
    }

    return records
        .map(mapEvent)  // Transforma os dados
        .filter((event) => event.title && event.occurrences.length > 0)
}