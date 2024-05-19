import Eleos 
                from "./Eleos";
import EleosPerson 
                from "./EleosPerson";

export interface AssetDistributionUnit {
    person: EleosPerson;
    percentage: number;
}

export enum AssetDistributionTiming {
    uponBothDeath = 0,
    uponPrincipalDeath = 1,
    uponSpouseDeath = 2,
}
    

export enum AssetDistributionMethods {
    allToSpouse = 'allToSpouse',
    amongOtherHeirs = 'amongOtherHeirs',
}

class AssetDistribution {
    private distributions: AssetDistributionUnit[] = [];

    totalPercentage(): number {
        return this.distributions.reduce((acc, dist) => acc + dist.percentage, 0);
    }   

    changeDistribution(person: EleosPerson, percentage: number): void {
        const index = this.distributions.findIndex(dist => dist.person === person);
        if (index === -1) {
            throw new Error('Person not found in distribution');
        }
        this.distributions[index].percentage = percentage;
        const total = this.totalPercentage();
        if (total + percentage > 100) {
           console.log('Total percentage exceeds 100%');
        }
    }

    addDistribution(person: EleosPerson, percentage: number): void {
        const index = this.distributions.findIndex(dist => dist.person === person);
        if (index !== -1) {
            throw new Error('Person already in distribution');
        }

        const total = this.totalPercentage();
        this.distributions.push({person, percentage});
    }   

    removeDistribution(person: EleosPerson): void {
        const index = this.distributions.findIndex(dist => dist.person === person);
        if (index === -1) {
            throw new Error('Person not found in distribution');
        }
        this.distributions.splice(index, 1);
    }

    getDistribution(person: EleosPerson): number {
        const dist = this.distributions.find(dist => dist.person === person);
        if (!dist) {
            throw new Error('Person not found in distribution');
        }
        return dist.percentage;
    }

    get distributionsList(): AssetDistributionUnit[] {
        return this.distributions;
    }
}

export default AssetDistribution