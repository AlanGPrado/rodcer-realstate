export interface Agent {
    id: number;
    name: string;
    role: string;
    phone: string;
    email: string;
    image: string;
}

export const agents: Agent[] = [
    { id: 1, name: 'John Smith', role: 'Senior Agent', phone: '123 456 7890', email: 'john@rodcerstate.com', image: '/agent-1.jpg' },
    { id: 2, name: 'Sarah Johnson', role: 'Real Estate Agent', phone: '123 456 7891', email: 'sarah@rodcerstate.com', image: '/agent-2.jpg' },
    { id: 3, name: 'Michael Brown', role: 'Real Estate Agent', phone: '123 456 7892', email: 'michael@rodcerstate.com', image: '/agent-3.jpg' },
    { id: 4, name: 'Emily Davis', role: 'Real Estate Agent', phone: '123 456 7893', email: 'emily@rodcerstate.com', image: '/agent-4.jpg' },
    { id: 5, name: 'David Wilson', role: 'Property Consultant', phone: '123 456 7894', email: 'david@rodcerstate.com', image: '/agent-5.jpg' },
    { id: 6, name: 'Lisa Anderson', role: 'Senior Consultant', phone: '123 456 7895', email: 'lisa@rodcerstate.com', image: '/agent-6.jpg' },
    { id: 7, name: 'James Martinez', role: 'Real Estate Agent', phone: '123 456 7896', email: 'james@rodcerstate.com', image: '/agent-7.jpg' },
    { id: 8, name: 'Jennifer Taylor', role: 'Property Specialist', phone: '123 456 7897', email: 'jennifer@rodcerstate.com', image: '/agent-8.jpg' },
];

export function getAgentById(id: number): Agent | undefined {
    return agents.find(a => a.id === id);
}
