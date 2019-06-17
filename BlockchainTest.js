//Blockchain Basis Quellcode

const SHA256 = require('crypto-js/sha256');

class Block {   // Definition der Klasse Block
    constructor(index, timestamp, data, previousHash = ''){    // Definition des Blockinhalts
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){   // Definition des Inhaltes der HashWert berechnung
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();   
    }
}

class Blockchain {  // Definition der Klasse Blockchain
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){   // Erstellung des "UrBlocks" = GenesisBlock
        return new Block(0, "01/06/2019 - 16:23", "GenesisBlock", "0");  
    }

    getLatestBlock(){  // Funktion zur Info erhaltung des vorherigen Blocks
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){   // Funktion zum Anhängen von neuen Blöcken
        newBlock.previousHash = this.getLatestBlock().hash;  // PreviousHash des aktuellen Block muss gleich sein dem Hash des vorherigen Block
        newBlock.hash = newBlock.calculateHash();  // Neuberechnung des Hash des aktuellen Blocks
        this.chain.push(newBlock);  // Anhängen des neuen Blocks an die bisherige Chain
    }

    isChainValid(){   // Überprüfung der Gültigkeit der gesamten Blockchain 
        for(let i = 1; i < this.chain.length; i++){   // Start mit dem ersten Block, Überprüfung von i über gesamte Kette bis zur max. Blockanzahl
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){  // Überprüfung ob er aktuelle Hash des Blocks mit dem neuberechneten Hash übereinstimmt
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){  // Überprüfung on previousHash des aktuellen Block mit dem previousHash übereinstimmt
                return false;
            }
        }

        return true;
    }
}

let ANguyenBC = new Blockchain();  //ANguyenBC soll die neue Blockchain sein

ANguyenBC.addBlock(new Block(1, "02/06/2019 - 11:00", "UID NFC Tag + Info 1"));  // Erstellen von neuen Blöcken + anhängen an die Chain
ANguyenBC.addBlock(new Block(2, "03/06/2019 - 12:00", "UID NFC Tag + Info 2"));

console.log(JSON.stringify(ANguyenBC, null, 2));
console.log('Is ANguyenBlockchain valid?' + ANguyenBC.isChainValid());


//Versuch nachträgliche Änderungen durchzuführen

ANguyenBC.chain[1].data = "UID NFC Tag 09 + Info 1";   // Versuch der nachträglichen Data Änderung in Block 1
ANguyenBC.chain[1].hash = ANguyenBC.chain[1].calculateHash();   //  nachträglich HashWert neuberechnung

console.log(JSON.stringify(ANguyenBC, null, 2));
//console.log('Is ANguyenBlockchain valid?' + ANguyenBC.isChainValid());

