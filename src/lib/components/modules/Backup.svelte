<script>
	import { onMount } from "svelte";
	let backups = [];
	let selectedBackup;
	let restoreDisabled = true;
	let isLoading = false;

	$: tenant = "3988fc5a_af7d_4ffb_8ce4_06132bd037a2";
	$: backupTarget = "new-backup-2023-02-13-10-18-16.tar.gz";

	async function deleteBackup(tenant, file) {
		return await fetch("https://mark8t.ca/api/delete.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `tenant=${tenant}&file=${file}`,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					console.log(data.message);
				} else {
					console.error(data.message);
				}
			});
	}
	async function backup(tenantId, suffix) {
		isLoading = true;
		const response = await fetch("https://mark8t.ca/api/backup.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `tenant=${tenantId}&suffix=${suffix}`,
		});

		const result = await response.json();

		if (result.success) {
			console.log(`Backup for tenant ${tenantId} was successful.`);
			console.log(result.details);
			isLoading = false;
		} else {
			console.error(`Backup for tenant ${tenantId} failed.`);
			console.error(result.error);
			isLoading = false;
		}
	}

	async function backupList(tenant) {
		const response = await fetch(
			"https://mark8t.ca/api/list.php" + "?tenant_id=" + tenant,
			{
				method: "GET",
			}
		);
		const data = await response.json();
		backups = data.backups;
	}
	async function restoreBackup(tenantId, filename) {
		const response = await fetch("https://mark8t.ca/api/restore.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `tenant=${tenantId}&file=${filename}`,
		});
		const result = await response.json();
		if (result.success) {
			console.log(`Restore completed successfully: ${result.message}`);
		} else {
			console.error(`Restore failed: ${result.message}`);
		}
	}

	//
	async function renameBackup(tenant_id, backup_file, new_backup_file) {
		console.log(new_backup_file);
		//add .tar.gz if not in new_backup_file
		if (!new_backup_file.includes(".tar.gz")) {
			new_backup_file = new_backup_file + ".tar.gz";
		}
		//add .gz if not in new_backup_file
		if (!new_backup_file.includes(".gz")) {
			new_backup_file = new_backup_file + ".gz";
		}
		//if new_backup_file doesnt include a date, put it between the name and the .tar.gz

		const addDateToBackupFile = () => {
			let date = new Date()
				.toISOString()
				.substring(0, 19)
				.replace(/[-T]/g, "-");

			if (!new_backup_file.includes(date)) {
				let [name, extension] = new_backup_file.split(".tar.gz");
				new_backup_file = `${name}-${date}.tar.gz`;
			}
		};

		addDateToBackupFile();

		try {
			let response = await fetch("https://mark8t.ca/api/rename.php", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `tenant=${tenant_id}&old_filename=${backup_file}&new_filename=${new_backup_file}`,
			});
			let data = await response.json();
			if (data.success) {
				console.log(
					`Success: Backup file "${backup_file}" was renamed to "${new_backup_file}" for tenant "${tenant_id}".`
				);
			} else {
				console.error(
					`Error: Could not rename backup file "${backup_file}" for tenant "${tenant_id}". Reason: ${data.message}`
				);
			}
		} catch (error) {
			console.error(
				`Error: Could not rename backup file "${backup_file}" for tenant "${tenant_id}". Reason: ${error}`
			);
		}
	}
	//
	onMount(async () => {
		backupList(tenant);
	});

	async function handleBackupClick() {
		await backup(tenant, "suffex");
		await backupList(tenant);
	}

	function handleRestoreClick() {
		console.log("selectedBackup", selectedBackup);
		restoreBackup("3988fc5a_af7d_4ffb_8ce4_06132bd037a2", selectedBackup);
	}

	function handleSelect(backup) {
		selectedBackup = backup;
		restoreDisabled = false;
	}

	async function handleRenameClick() {
		if (!selectedBackup) return;
		let a = await prompt(selectedBackup);
		// dialogValue = selectedBackup;
		// dialogOpen = !dialogOpen;
		// return;
		if (!a) return;
		// dialogOpen = true;
		// dialogOnDismiss = () => {
		// dialogOpen = false;
		renameBackup(
			"3988fc5a_af7d_4ffb_8ce4_06132bd037a2",
			selectedBackup,
			a
		).then(() => {
			backups = backups.map((backup) => {
				if (backup.filename === selectedBackup) {
					backup.filename = a;
				}
				return backup;
			});
			backupList(tenant);
		});
		// };
	}

	function handleDeleteBackup() {
		if (!selectedBackup) return;
		deleteBackup(
			"3988fc5a_af7d_4ffb_8ce4_06132bd037a2",
			selectedBackup
		).then(() => {
			backups = backups.filter((backup) => {
				return backup.filename !== selectedBackup;
			});
			selectedBackup = null;
			restoreDisabled = true;
		});
	}

	import Dialog from "./Dialog.svelte";

	let dialogValue = "";
	let dialogOpen = false;
	let dialogOnDismiss = () => {};

	const handleSave = (value) => {
		dialogValue = value;
		console.log(value);
		// dialogOnDismiss();

		renameBackup(
			"3988fc5a_af7d_4ffb_8ce4_06132bd037a2",
			selectedBackup,
			value
		).then(() => {
			backups = backups.map((backup) => {
				if (backup.filename === selectedBackup) {
					backup.filename = value;
				}
				return backup;
			});
		});
	};
</script>

<Dialog
	bind:value={dialogValue}
	on:save={handleSave}
	bind:open={dialogOpen}
	on:dialogOnDismiss={() => {
		dialogOpen = !dialogOpen;
	}}
/>

<button on:click={handleBackupClick} disabled={isLoading}
	>{isLoading ? "..." : "Backup"}</button
>
<button on:click={handleRestoreClick} disabled={isLoading || restoreDisabled}
	>Restore</button
>

<ul class="backup-list">
	{#each backups as backup}
		<li
			class:selected={selectedBackup === backup.filename}
			class="backup-list-item"
			on:click={() => handleSelect(backup.filename)}
		>
			<div>
				{backup.filename} ({backup.filesize} bytes)
				<br />
				Modified: {backup.modified_date}
				<br />
				Created: {backup.created_date}
			</div>
			<div>
				<button on:click={handleRestoreClick}>Restore</button>
				<button on:click={handleRenameClick}>Rename</button>
				<button on:click={handleDeleteBackup}>Delete</button>
			</div>
		</li>
	{/each}
</ul>

<style>
	.backup-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.backup-list-item {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.backup-list-item:last-child {
		border-bottom: none;
	}

	.backup-list-item.selected {
		background-color: #ddd;
	}
</style>
