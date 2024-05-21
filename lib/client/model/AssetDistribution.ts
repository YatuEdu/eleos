export enum AssetDistributionTiming {
    principalDiceased = 0,
    spouseDeceased = 1,
    bothDecesed = 2,
    singleDeceased = 3,
}

export enum AssetDistributionMethod {
    allToSpouse = 'allToSpouse',
    amongOtherHeirs = 'amongOtherHeirs',
} 

class AssetDistribution {
    private _distributions: Map<string, number> = new Map()

    get totalPercentage(): number {
        return [...this._distributions.values()].reduce((acc, dist) => acc + dist, 0);
    }   

    changeDistribution(person: string, percentage: number): void {
        const distribution = this._distributions.get(person)
        if (!distribution) {
            throw new Error('Person not found in distribution');
        }
        this._distributions.delete(person)
        this.setDistribution(person, percentage)
    }

    addDistribution(person: string, percentage: number): void {
        const distribution = this._distributions.get(person)
        if (distribution) {
            throw new Error('Person already in distribution');
        }
        this.setDistribution(person, percentage)
    }   

    setDistribution(person: string, percentage: number): void {
        this._distributions.set(person, percentage)
        const total = this.totalPercentage
        if (total + percentage > 100) {
           console.log('Total percentage exceeds 100%');
        }
    }

    removeDistribution(person: string): void {
        this._distributions.delete(person)
    }

    getDistribution(person: string): number | undefined {
        return this._distributions.get(person)
    }

    get distributionsList() {
        return this._distributions.entries()
    }
}

export default AssetDistribution

