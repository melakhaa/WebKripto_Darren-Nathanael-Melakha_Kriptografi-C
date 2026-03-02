document.addEventListener('DOMContentLoaded', () => {
    const cipherSelect = document.getElementById('cipherSelect');
    cipherSelect.addEventListener('change', (e) => {
        document.querySelectorAll('.cipher-key').forEach(el => el.classList.remove('active'));
        const activeDiv = document.getElementById(e.target.value + 'KeyDiv');
        if (activeDiv) activeDiv.classList.add('active');
    });

    document.getElementById('btnEncrypt').addEventListener('click', () => processText(true));
    document.getElementById('btnDecrypt').addEventListener('click', () => processText(false));

    const btnDarkMode = document.getElementById('btnDarkMode');
    btnDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            btnDarkMode.textContent = 'Light Mode';
        } else {
            btnDarkMode.textContent = 'Dark Mode';
        }
    });
});

function cleanText(text) {
    return text.toUpperCase().replace(/[^A-Z]/g, '');
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function processText(isEncrypt) {
    const cipher = document.getElementById('cipherSelect').value;
    const input = cleanText(document.getElementById('inputText').value);
    let output = '';

    if (!input) {
        alert("Masukkan teks yang valid (harus mengandung alfabet)!");
        return;
    }

    try {
        switch (cipher) {
            case 'vigenere':
                output = vigenere(input, isEncrypt);
                break;
            case 'affine':
                output = affine(input, isEncrypt);
                break;
            case 'playfair':
                output = playfair(input, isEncrypt);
                break;
            case 'hill':
                output = hill(input, isEncrypt);
                break;
            case 'enigma':
                output = enigma(input, isEncrypt);
                break;
        }
        document.getElementById('outputText').value = output;
    } catch (e) {
        alert("Error: " + e.message);
    }
}

function vigenere(text, isEncrypt) {
    const key = cleanText(document.getElementById('vigenereKey').value);
    if (!key) throw new Error("Kunci Vigenere tidak boleh kosong atau selain huruf.");

    let result = '';
    for (let i = 0; i < text.length; i++) {
        const p = text.charCodeAt(i) - 65;
        const k = key.charCodeAt(i % key.length) - 65;
        const c = isEncrypt ? mod(p + k, 26) : mod(p - k, 26);
        result += String.fromCharCode(c + 65);
    }
    return result;
}

function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return -1;
}

function affine(text, isEncrypt) {
    const a = parseInt(document.getElementById('affineA').value);
    const b = parseInt(document.getElementById('affineB').value);
    if (isNaN(a) || isNaN(b)) throw new Error("Nilai Multiplier (a) dan Shift (b) harus diisi dengan angka.");

    const aInv = modInverse(mod(a, 26), 26);
    if (aInv === -1) throw new Error("Nilai 'a' tidak relatif prima dengan 26. (Coba gunakan a = 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25)");

    let result = '';
    for (let i = 0; i < text.length; i++) {
        const p = text.charCodeAt(i) - 65;
        let c;
        if (isEncrypt) {
            c = mod(a * p + b, 26);
        } else {
            c = mod(aInv * (p - b), 26);
        }
        result += String.fromCharCode(c + 65);
    }
    return result;
}

function generatePlayfairKey(keyString) {
    const key = cleanText(keyString).replace(/J/g, 'I');
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    let matrix = [];
    let used = new Set();

    const addChar = (char) => {
        if (!used.has(char)) {
            used.add(char);
            matrix.push(char);
        }
    };

    for (let char of key) addChar(char);
    for (let char of alphabet) addChar(char);

    let grid = [];
    for (let i = 0; i < 5; i++) {
        grid.push(matrix.slice(i * 5, i * 5 + 5));
    }
    return grid;
}

function findPosition(grid, char) {
    if (char === 'J') char = 'I';
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (grid[r][c] === char) return { r, c };
        }
    }
    return null;
}

function playfair(text, isEncrypt) {
    const keyString = document.getElementById('playfairKey').value;
    const grid = generatePlayfairKey(keyString);
    text = text.replace(/J/g, 'I');

    if (isEncrypt) {
        let prepText = '';
        for (let i = 0; i < text.length; i++) {
            prepText += text[i];
            if (i < text.length - 1 && text[i] === text[i + 1]) {
                prepText += 'X';
            }
        }
        if (prepText.length % 2 !== 0) prepText += 'X';
        text = prepText;
    } else {
        if (text.length % 2 !== 0) throw new Error("Panjang ciphertext Playfair harus genap.");
    }

    let result = '';
    const shift = isEncrypt ? 1 : -1;

    for (let i = 0; i < text.length; i += 2) {
        const char1 = text[i];
        const char2 = text[i + 1];
        const pos1 = findPosition(grid, char1);
        const pos2 = findPosition(grid, char2);

        if (!pos1 || !pos2) throw new Error("Karakter tidak valid ditemukan pada teks.");

        if (pos1.r === pos2.r) {
            result += grid[pos1.r][mod(pos1.c + shift, 5)];
            result += grid[pos2.r][mod(pos2.c + shift, 5)];
        } else if (pos1.c === pos2.c) {
            result += grid[mod(pos1.r + shift, 5)][pos1.c];
            result += grid[mod(pos2.r + shift, 5)][pos2.c];
        } else {
            result += grid[pos1.r][pos2.c];
            result += grid[pos2.r][pos1.c];
        }
    }
    return result;
}

function hill(text, isEncrypt) {
    const m00 = parseInt(document.getElementById('hill00').value);
    const m01 = parseInt(document.getElementById('hill01').value);
    const m10 = parseInt(document.getElementById('hill10').value);
    const m11 = parseInt(document.getElementById('hill11').value);

    if (isNaN(m00) || isNaN(m01) || isNaN(m10) || isNaN(m11)) {
        throw new Error("Matriks Hill (2x2) harus diisi dengan angka.");
    }

    let matrix = [[mod(m00, 26), mod(m01, 26)], [mod(m10, 26), mod(m11, 26)]];

    if (!isEncrypt) {
        const det = mod(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0], 26);
        const detInv = modInverse(det, 26);
        if (detInv === -1) throw new Error("Matriks tidak dapat dibalik (Determinan tidak relatif prima dengan 26). Dekripsi tidak mungkin.");

        matrix = [
            [mod(matrix[1][1] * detInv, 26), mod(-matrix[0][1] * detInv, 26)],
            [mod(-matrix[1][0] * detInv, 26), mod(matrix[0][0] * detInv, 26)]
        ];
    }

    if (isEncrypt && text.length % 2 !== 0) {
        text += 'X'; // Padding
    } else if (!isEncrypt && text.length % 2 !== 0) {
        throw new Error("Panjang ciphertext Hill harus genap.");
    }

    let result = '';
    for (let i = 0; i < text.length; i += 2) {
        const p1 = text.charCodeAt(i) - 65;
        const p2 = text.charCodeAt(i + 1) - 65;

        const c1 = mod(matrix[0][0] * p1 + matrix[0][1] * p2, 26);
        const c2 = mod(matrix[1][0] * p1 + matrix[1][1] * p2, 26);

        result += String.fromCharCode(c1 + 65) + String.fromCharCode(c2 + 65);
    }
    return result;
}

const ROTORS = {
    I: { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: 'Q' },
    II: { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: 'E' },
    III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: 'V' }
};
const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

class Rotor {
    constructor(type, position) {
        this.wiring = ROTORS[type].wiring;
        this.notch = ROTORS[type].notch;
        this.position = typeof position === 'string' ? position.charCodeAt(0) - 65 : position;
    }
    step() {
        let atNotch = String.fromCharCode(this.position + 65) === this.notch;
        this.position = mod(this.position + 1, 26);
        return atNotch;
    }
    forward(c) {
        const index = mod(c + this.position, 26);
        const charOut = this.wiring.charCodeAt(index) - 65;
        return mod(charOut - this.position, 26);
    }
    backward(c) {
        const index = mod(c + this.position, 26);
        const targetChar = String.fromCharCode(index + 65);
        const charIn = this.wiring.indexOf(targetChar);
        return mod(charIn - this.position, 26);
    }
}

function enigma(text, isEncrypt) {
    const pos1 = cleanText(document.getElementById('enigmaR1').value || 'A')[0] || 'A';
    const pos2 = cleanText(document.getElementById('enigmaR2').value || 'A')[0] || 'A';
    const pos3 = cleanText(document.getElementById('enigmaR3').value || 'A')[0] || 'A';

    let r1 = new Rotor('I', pos1);
    let r2 = new Rotor('II', pos2);
    let r3 = new Rotor('III', pos3);

    const reflect = (c) => REFLECTOR_B.charCodeAt(c) - 65;

    let result = '';
    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i) - 65;

        // Memutar rotor
        let stepR2 = r3.step();
        if (stepR2) {
            let stepR1 = r2.step();
            if (stepR1) r1.step();
        }

        // Maju (melalui rotor 3 -> 2 -> 1)
        c = r3.forward(c);
        c = r2.forward(c);
        c = r1.forward(c);

        // Reflektor
        c = reflect(c);

        // Mundur (melalui rotor 1 -> 2 -> 3)
        c = r1.backward(c);
        c = r2.backward(c);
        c = r3.backward(c);

        result += String.fromCharCode(c + 65);
    }

    return result;
}
