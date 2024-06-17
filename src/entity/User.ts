import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
	BeforeUpdate,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ default: true })
	isEnable: boolean = true;

	@Column({ type: 'tinyint', default: 0 })
	userType: number = 0;

	@Column({ type: 'int', nullable: true })
	utcHoursOffset: number | null = null;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@BeforeInsert()
	private async setInitialValues() {
		this.generateId();
		this.setCreatedAt();
		await this.hashPassword();
		this.setUtcHoursOffset();
	}

	@BeforeUpdate()
	private async setUpdateValues() {
		this.setUpdatedAt();
		await this.hashPassword();
	}

	private generateId() {
		this.id = uuidv4();
	}

	private async hashPassword() {
		if (this.password) {
			this.password = await bcrypt.hash(this.password, 10);
		}
	}

	private setCreatedAt() {
		this.createdAt = new Date();
	}

	private setUpdatedAt() {
		this.updatedAt = new Date();
	}

	private setUtcHoursOffset() {
		const now = new Date();
		const offset = -now.getTimezoneOffset() / 60; // Convert minutes to hours and invert the sign
		this.utcHoursOffset = offset;
	}
}
