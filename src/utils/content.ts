
export async function loadContent() {
    const response = await fetch('/config.json');
    return await response.json();
}